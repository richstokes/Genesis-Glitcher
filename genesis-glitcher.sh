#!/bin/bash
set -eE -o functrace
RUN_TIME=30 # How long to run each glitch for before generating a new one
EMULATRIX_URL="http://127.0.0.1:8000/Emulatrix_SegaGenesis.htm" # URL to launch browser at, which runs the game
ROM_DIR="./roms" # Directory to store ROMs in

# Function to catch failures in the script and report them
failure() {
  local lineno=$1
  local msg=$2
  echo "Failed at $lineno: $msg"
}
trap 'failure ${LINENO} "$BASH_COMMAND"' ERR

# Check ROMs are available
if [ -d "$ROM_DIR" ]
then
	if [ "$(ls -A $ROM_DIR)" ]; then
     echo "ROM dir OK!"
	else
    echo "$ROM_DIR is empty! Add some game ROMs to continue."; exit 1
	fi
else
	echo "Directory $ROM_DIR not found."; exit 1
fi

while :
do
	# Define hex lookup table option
	#hextable=68kops.txt
	hextable=hextable.txt
	#hextable=basichex.txt

	# Randomly pick a ROM from roms directory to modify
	TARGET_ROM=$(ls roms | sort -R | tail -n1 | while read file; do
	echo $file
	done)

	echo "Next up for glitching is $TARGET_ROM!"

	# Extract binary data from ROM image into a temporary hex dump
	cat "roms/$TARGET_ROM"  | xxd -c 64 -p > dumped.bin

	# Now we need to patch the hex data, by looping through it x times.
	# Too many times = a corrupted game which will not start.
	# Too few changes = no noticable glitching!
	# Somewhere around 30 seems to be a good balance
	# We can automate this based on size of the ROM dump - bigger games will typically need more modifications
	romsize=$(cat dumped.bin | wc -l)
	x=1
	# y=$(echo "$romsize * 0.0100 / 1" | bc)
	y=$(echo "$romsize * 0.0145 / 1" | bc)

	# Iterate through the ROM, replacing the target hex values with random ones
	while [ $x -le $y ]
	do
		# echo "Modification loop round $x/$y!"

		lines="$(cat dumped.bin | wc -l)"
		toedit="$(gshuf -i 1-"$lines" -n1)"

		hex1="$(gshuf -n 1 $hextable)"
		hex2="$(gshuf -n 1 $hextable)"

		if [ $hex1 != $hex2 ]
			# echo "Hacking $TARGET_ROM at line number $toedit"
			# echo "Replacing Hex value $hex1 with $hex2"
			echo -ne "Replacing Hex value $hex1 with $hex2 (loop round $x/$y)! \r"
			then
				sed -i '' "${toedit}s/${hex1}/${hex2}/I" dumped.bin
				x=$(( $x + 1 ))
		fi
	done
	rm -rf sed* || true # Cleanup any temp. sed files

	# Convert modified hex dump back into binary data (ROM File), ready for emulator
	DEST_ROM="rebuilt.bin"
	cat dumped.bin | xxd -p -r > $DEST_ROM
	echo ""
	echo "Hacked $TARGET_ROM ROM Reassembled into $DEST_ROM.."
	osascript -e 'quit app "Firefox"' || true # Kill firefox if already running
	sleep 2 # Give FF a couple of seconds to close

	cp $DEST_ROM "Emulatrix/ga.bin" # Copy ROM to emulatrix directory
	echo "Fixing checksum.."
	python3 sega_genesis_checksum_utility.py Emulatrix/ga.bin > /dev/null || echo "Failed to fix checksum!"

	echo "Running emulator with glitched ROM... "
	# Launch browser to emulate the game
	open -a firefox -g $EMULATRIX_URL

	echo "Time until next glitch:"
	COUNTDOWN=$RUN_TIME
	while [ $COUNTDOWN -gt 0 ]; do
		echo -ne "$COUNTDOWN\033[0K\r"
		sleep 1
		: $((COUNTDOWN--))
	done
done
