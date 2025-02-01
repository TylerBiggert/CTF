# Steps
1. Download the .zip file
2. Extract & Review the .zip file
   1. Get an understanding that the .zip has system, user, application logs.
   2. We are trying to either find the cheat program (wont work because these folders have been deleted from the logs), or where the cheat program was downloaded from.
   3. 2025-01-17T040003_Evidence.zip\C\Users\IEUser\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\History
      1. DB Browswer App -> Browse Data tab -> Look through the different tables to find the download link
3. Download the cheat
   1. https://github.com/hannah1337/CyberValorant-Cheat-Visual-Aimbot-ESP/archive/refs/heads/main.zip
4. Review the source in VSC for malware
   1. Option 1: Zoom out with shortcut `CTRL-`, and look for (BIG BLOCKS or LONG STRINGS) of encoded text
   2. Option 2: Search `CTRL Shift F` for common hacks 'powershell', 'exec:', 'cmd', 'command', 'run'
5. Review the malware
   1. Create a string using variable B then D then C.
   2. Decode this string from Base64
   3. Review the end of this new code and see that the string inside is reversed. So reverse it then Base64 decode
6. Work with this Powershell Command
   1. Strip out the parts of the script you want to run to be able to decode the four strings
      1. https://pastebin.com/raw/WXv3AYTr
      2. https://pastebin.com/raw/KRH6ZPYY
      4. https://rentry.co/z362xk8f/raw
      5. https://rlim.com/tJ7Iv5-8vA/raw
         1. This is the correct one
   2. You can remove /raw from the URL, and then view the history
      1. w4jCmMOWwpPDrsKpWVTCmsKywqDDpcKwwolawrrDj8KPwp3DpsKwwqPCm8OEwoXDj8KIw6/DkMKgworCpcK8wpHCrMKfwozCmMK/w4lPw5vDo8ODwrLCn8KPwpbDh8KPw6DDkMKdworCpnjCkMOswrLClcKYw4bDgcKGwp3Dq8K0wrTCosOPU8K2d8K/w4HCj8KVwp/CqsKlwqtywqE=
   3. Update the Powershell Command to use this encoded string and the other key ($proc)
      1. https://github.com/hackdametaverse/delhi-metro/releases/download/metro/TTDReplay.7z
      2. This will download a password protected zip
      3. The password is variable $s in the Powershell script
         1. Base64 decode and then from decimal
   4. Extract the .7z
      1. 7z x TTDReplay.7z -p227345637233742d704073737730726422
      2. This will extract the SearchFilter.exe file
      3. `file SearchFilter.exe` to see it was comiled from .NET
7. ILSpy
   1. Open ILSpy
   2. Open the SearchFilter.exe file