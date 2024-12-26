# Wire Shark
- If you are given some type of packet capture file (`.pcap .pcapng .cap .dmp .gz .zip .erf .enc .bfr .trc .txt .csv`) then you will need to launch Wireshark
- File -> Open -> Navigate to your file

# Extract File
- Network File Share (NFS)
  - Main Concept: Someone wrote a file to a directry. If there is LOTS of traffic, you will need to filter it to the file the packet where the file was actually written. This packet will be a WRITE and have a DATA property.
  - Filter Example: nfs.access_xattr_write
  - Packet Window
    - Network File System -> Operations -> Opcode: WRITE (38)
    - Right Click Data: DATA (38) -> Copy as hex stream
    - CyberChef -> Past Input -> Recipes: From Hex + Render Image
