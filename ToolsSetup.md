## Ghidra
- Go to their GitHub and grab the link for the version you want 
- Download
  - Open a root terminal
  - Navigate to where you want the app to live `cd /usr/share`
  - `wget linkToTheGitHubVersionYouWant`
  - `unzip ghidra_11.2.1_PUBLIC.zip`
  - Rename the directory if you want  `mv ghidra_11.2.1_PUBLIC ghidra`
  - Delete the .zip file `rm ghidra_11.2.1_PUBLIC` 
- Install
  - `cd /usr/share/ghidra`
  - `./ghidraRun`
    -  If missing the correct Java Version
       -  `apt-cache search java{{VersionNumberHere}}`
       -  `apt install pacakge-name-from-search-results-here`
       - Example `apt install openjdk-21-jdk`
       -  Try the `./ghidraRun` again
- Setup
  - File -> New Project -> Non-shared project
  - Project Directory: /home/{{userNameHere}}/Documents/GhidraProjects
  - Project Name: ctf
  - File -> Import File -> pick any binary from any ctf challenge
  - Double click the file name (don’t click the cool looking green dragon)
  - Click yes when it asks to analyze the file -> keep defaults -> analyze
- Icon Creation
  - Open a root terminal
    - `cd ~/.local/share/applications`
    - `nano ghidra.desktop`
    - Add this to the file 
        -   ```
			[Desktop Entry]
			Name=Ghidra
			Comment=Software Reverse Engineering Tool
			Exec=/usr/share/ghidra/ghidraRun
			Icon=/usr/share/icons/hicolor/256x256/apps/kali-ghidra.png
			Terminal=false
			Type=Application
			Categories=Development;Security;
            ```
    - Make `chmod +x ~/.local/share/applications/ghidra.desktop`
  - Panel Bar
    - Right click -> add new item -> Launcher
    - Right click Launcher -> Properties -> add -> Ghidra

# Burp Suite

# WireShark
- Came preinstalled on Kali Linux