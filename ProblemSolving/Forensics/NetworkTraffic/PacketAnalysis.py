'''
This template allows you to work with PacketCapture records.
This is useful if you have many records to work with.
For simple data analysis you can probably just copy and paste into CyberChef.
'''

import sys
import pyshark # Maps packet cature record to a useable object
import pwn # Unpacks byte data (base64, xor, Unpack 16bit int from Octet/TwoBytes)

# File path where your File Capture is stored
# File extension should be PCAP or PCAPNG
# Ex. packetCaptureFilePath = '/home/{userNameHere}/Downloads/{fileNameHere.pcapng}'
packetCaptureFilePath = ''

# Create this filter inside wireshark first
# This filter should only return the packets you want to read the bytes for
# Ex. 'not arp'
packetCaptureFilter = ''


try: 
    # Maps all the packet captures results
    packetCaptureRecords = pyshark.FileCapture(input_file=packetCaptureFilePath, display_filter=packetCaptureFilter)
except FileNotFoundError as e:
    print(f'[FATAL] File not found. Verify the file exists at packetCaptureFilePath:{packetCaptureFilePath}')
    sys.exit(1)

# TODO - map the packetCaptureRecords by different protocols transport_layer

# For every packet in the packetCaptureList
for currentPacketIndex, currentPacket in enumerate(packetCaptureRecords):
    # Different Packets will have different properties based on protocols
        # View the packets in WireShark, or pytho debugger, to get an idea of what you can access
        # UDP properties: Frame, Ethernet, IPV, UDP, Data
    try:
        # Grabs the byte data from the current packet
        packetDataHexString = currentPacket.data.data
        packetDataBytes = bytes.fromhex(packetDataHexString)
    except AttributeError as e:
        print(f'[INFO] Skipping packetCaptureRecords[{currentPacketIndex}] - No data property')

    # Happy Hacking :)
    print(packetDataHexString)
    print(packetDataBytes)