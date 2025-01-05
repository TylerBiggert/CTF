# Web Exploitation
- Identify the problem category
  - Is this a file upload, injection, bypass problem
- Figure out where exactly the flag is stored
  - What needs to happen to retrieve it
  - How is the flag being stored
- Harder problems
  - Have multiple steps to solve

# Reverse Engineering
- Identify the problem category
  - Is this a binary or script
- Common Objectives:
  - Find, decode, decrypt strings
  - Find hard coded comparison values
  - Create scripts to reverse engineer functions
- Requires understanding the program's logic
  - Rename functions/variables when you figure out what they are responsible for

# Forensics
- Identify the problem category
  - Is this a network traffic, malware review, file exploration
- Inspect metadata
  - exiftool or CyberChef
    - If you use CyberChef, you probably need to add additional recipe to extract the metadata
- Malware Payload
  - Find what is trying to be ran
  - Decode/Decrypt the payload

# Cryptography
- Identify the problem category
  - Is it encoding or encryption
  - Problem Hints:
    - What method was used to encode/encrypt
    - What the encryption key is
    - What the encryption key length is
- What type of encryption is it?
  - Caesar/ROT
  - Substitution
    - One to One
      - Given an alphabet or all possible characters
    - Polyalphabetic (Vignere, Playfair, Beaufort, Autokey)
      - Multiple characters represent a single character
      - Need to have the key, or the length of the key
  - Transposition (Railfence, Columnar, Route)
    - Likely if the message to solve was give in a table format 