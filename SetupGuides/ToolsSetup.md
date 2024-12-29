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
    - `cd /usr/share/applications`
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
      - To save: Ctrl + O -> enter -> Ctrl + X
    - Make it executable `chmod +x /usr/share/applications/ghidra.desktop`
  - Panel Bar
    - Right click -> add new item -> Launcher
    - Right click Launcher -> Properties -> add -> Ghidra

# Burp Suite
- Kali Linux Panel -> Applications icon -> 03 - Web Application Analysis -> Burpsuite -> Start
- Burpsuite 
	- Proxy -> Proxy Settings -> Import/Export CA certificate -> Certificate in DER format -> Next -> Select file -> Add a file name -> Remember the path where it saved
	- Proxy -> Intercept -> click 'Intercept is off' to toggle it on
- Firefox
	- Hamburger Menu -> Settings -> Scroll to bottom Network Settings -> Settings
		- Manual Proxy Configuration
		- HTTP Proxy: 127.0.0.1  Port: 8080
		- Check the option to 'Also use this proxy for HTTPS'
		- OK
	- Hamburger Menu -> Settings -> Search for Certificates -> View Certificates -> Import
		- Find the cert you saved earlier
		- Select the option to Trust this CA to identify websites
- Kali Panel
  - Right click inside the Kali Panel -> Panel -> Add new items -> Launcher -> Add
  - This will add the white gear to the top right
  	- Right click the white gear icon -> properties -> Plus Sign to add new item
  	- Search for Burp -> Add burpsuite

# WireShark
- Came preinstalled on Kali Linux
-  Kali Panel
   -  Right click inside the Kali Panel -> Panel -> Add new items -> Launcher -> Add
   -  This will add the white gear to the top right
      -  Right click the white gear icon -> properties -> Plus Sign to add new item
      -  Search for wire -> Add wireshark

# Command Line Tools
- Oletools
  - `sudo -H pip install -U oletools[full]`
