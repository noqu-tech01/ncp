#!/bin/bash

# Download unixODBC source tarball
curl -O https://ftp.osuosl.org/pub/blfs/conglomeration/unixODBC/unixODBC-2.3.11.tar.gz

# Extract the tarball
tar -xzf unixODBC-2.3.11.tar.gz

# Change to the extracted directory
cd unixODBC-2.3.11

# Configure, build, and install
./configure
make
sudo make install

# Verify installation
odbcinst -j
