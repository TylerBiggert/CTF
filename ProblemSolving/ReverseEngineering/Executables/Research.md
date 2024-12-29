
# Identify the Executable File
- Download the file
- Run a `file filenamehere` to get the details
  - ELF
    - You will be able to run the program locally

# Run the Executable file
- Mark the file as an executable
  - Terminal -> `chmod +x filenamehere`
- Run the executable
  - `./filenamehere`

# Ghidra
  1. Window -> defined strings
     1. If the app prints the flag, look for the string
     2. If the program has any output around the flag, research that
     3. MetaCTF = 4d657461435446
  2. Window -> decompiler
     1. What functions are running
     2. Double click to navigate around
     3. Select lines to get memory location details