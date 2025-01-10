from pwn import *

# Connects to the program or the remote host
# Verifies the configs were set correctly
def getConnection():
    if (isLocalRun):
        try:
            appConnection = process(binaryFileName)
        except Exception as e:
            print(f'[FATAL] Did you run `chmod +x {binaryFileName}`? Does the file exist there?')
            sys.exit(1)
    else: 
        if not (remoteHost and remotePort):
            raise ValueError("[FATAL] Remote host and port not set correctly.")
        try:
            appConnection = remote(remoteHost, remotePort)
        except Exception as e:
            print(f'[FATAL] Cant reach host: {remoteHost} and port: {remotePort}. Possibly you sent to many requests?')
            sys.exit(1)
    return appConnection

# Set up these configs
binaryFileName = '' # Ex. '/home/kali/Downloads/fileNameHere'
isLocalRun = True; # If true, runs your binary. If false, connects to remote
remoteHost = '' # Ex. 'kubenode.mctf.io'
remotePort = 0 # Ex. 30012
numberOfTimesToRunThisScript = 1 # Do not run the script many times while connected to the remote
textToWaitForBeforeSendingFirstPayload = '' # Run the program for real once to see what text is displayed Ex. 'positive energy'

for loopIndex in range(numberOfTimesToRunThisScript):
    # Establish the process connection
    appConnection = getConnection()

    # Allows you to reference function and variable names in the binary
    elf = ELF(binaryFileName)
        # print(elf.symbols) # Function and variable references
        # print(elf.plt) # Procedure Linkage Table (PLT)
        # print(elf.got) # Global Offset Table (GOT)

    # The connection is not instant, so need to wait for this string to display in the terminal
    firstTerminalResponse = appConnection.recvuntil(delims=textToWaitForBeforeSendingFirstPayload)
        # appConnection.recv() - Exact number of bytes
        # appConnection.recvline() - Read until first newline character \n
        # appConnection.recvlines(n) - Read n number of lines
        # appConnection.recvall() - Expect the program to close the connection after the response

    # Craft the input/payload you want to send in the request
    firstPayload = '' # Ex. b'%19$p'

    # Sends text/numbers/bytes to the program and appends a newline
    appConnection.sendline(firstPayload)
        # Padded Payload
            # appConnection.sendFit(
                # fit({
                #     40: p32(0xdeadbeef),  # Place 0xdeadbeef at offset 40 - 43
                #     60: b'/bin/sh\x00'    # Place "/bin/sh" string at offset 60
                # }, filler=b'A') # 0 - 39 will be filled with 'A' bytes)
        # Buffer Overflow Payload
            # payload = flat(
            #     b"A" * CANARY_BUFFER_OFFSET,  # Overflow buffer
            #     p64(canary),                  # Canary value
            #     b"B" * 8,                     # Padding to reach return address
            #     elf.symbols.win
            # )    # Read the response from the program

    # Change this if it isnt the last response you want to read
    finalTerminalResponseBeforeClosing = appConnection.recvall()

    # Close the program before starting the next loop
    # This way the program starts at the beginning each time
    appConnection.close()