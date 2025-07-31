#!/bin/bash

# Check if Homebrew is installed
if ! command -v brew &> /dev/null
then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "Homebrew installed. Please restart your terminal or run the following command to add Homebrew to your PATH:"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"'
    exit 1
else
    echo "Homebrew is already installed."
fi

# Add Homebrew to PATH for this script session
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install unixODBC
echo "Installing unixODBC via Homebrew..."
brew install unixodbc

# Verify unixODBC installation
echo "unixODBC installation details:"
odbcinst -j

# Run the Node.js project
echo "Starting Node.js project..."
cd noquADM/noqu-admin-panel-backend
npm install
npm run dev
