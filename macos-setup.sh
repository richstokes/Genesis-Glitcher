#!/bin/bash
# Helper script to install the required packages
# Designed for MacOS
function pre-flight {
    echo -n "🛫  Running pre-flight checks.. "
    which python3 > /dev/null || { echo "python3 missing, please install it!"; exit 1; }
    which gshuf > /dev/null || { echo "gshuf not installed (try 'brew install coreutils')"; exit 1; }
    which xxd > /dev/null || { echo "xxd missing, please install it!"; exit 1; }
    echo "✅  Environment looks good!" && echo
}

pre-flight