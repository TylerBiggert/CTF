
## VirtualBox (PC Guide)
- Confirm Virtualization is turn on for your PC
   - Windows Search -> Task Manager -> Performance Tab -> Bottom right should say 'Virtualization: Enabled'
        - If not enabled, look up tutorial on how to enter your BIOS and enable virtualization
- Confirm Microsoft Visual C++ Redistribution is installed
    - Windows Search -> Add and Remove Programs -> Scroll down to Microsoft Visual C++ Redistribution
        - If not present
            - Windows Search -> System Information -> Look for the 'System Type' value
            - Download the version for your 'System Type' https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170
            - Run the downloaded .exe file
            - Restart your PC after the install finishes
- Confirm Python Core is installed
    - Windows Search -> Command Prompt -> python --version
        - If not present
            - Download Python Installer for your 'System Type' https://www.python.org/downloads/windows/
            - Run the downloaded .exe file
            - Add python to path and install as admin
- Confirm Win31API is installed
    - Windows Search -> Command Prompt (Run as administrator)
        - py -m pip install pywin32
- Virtual Box Software
    - Download
        - https://www.virtualbox.org/wiki/Downloads
        - Since this is a PC tutorial pick 'Windows Hosts'
        - Wait for download to finish
    - Install
        - Run the downloaded .exe file
        - Select 'Expert' settings
        - File -> Preferences -> Set your default machine folder where you want c:\ProgramFiles\Oracle\VirtualBox

## Kali Linux VM
- Download https://www.kali.org/get-kali/#kali-platforms
- Choose the Pre-built Virtual Machines Option
- Download the VirtualBox image
- Wait for it to finish
- Move the zip file from the downloads folder to a 
- Extract the zip file to C:\Program Files\Oracle\VirtualBox\VirtualMachines
	- If you get a permission error, you probably need to download and install WinRAR https://www.win-rar.com/download.html?&L=0
	- Then right click the Kali download -> WinRAR -> Extract
- VirtualBox Manager
- Windows Search -> Oracle VirtualBox -> Right Click -> Run as administrator (must do this for setting changes to save)
- Adding the Kali Linux Virtual Machine
	- Machine Tab -> Add
	- Navigate to the  C:\Program Files\Oracle\VirtualBox\VirtualMachines  and select the virtual machine file
- Configuring the Kali Linux Virtual Machine
	- Make sure Kali Linux is selected
	- Click the orange settings cog icon
	- General.Basic tab
		- Rename the box to 'Kali-Pristine'
	- General.Advanced tab
		- Shared Clipboard: Disabled
		- Drag'n'drop: Disabled
	- System.Motherboard tab
		- Base Memory: 4096 if it stays within green range
	- System.Processor
		- Processors: 2
	- OK -> Back to main menu
	- Right click Kali-Pristine -> Clone
		- Name: Kali-JuiceShop
		- Finish			

## GitHub
- Create your account or log in https://github.com/
- Create a new repository, or grab the clone link to a repository you want to use

## Git
This is needed so you can work with GitHub repositories.
- Instructions https://git-scm.com/downloads/linux
- Setup Git
  - Open a Root Terminal
  - apt-get install git
  - Git config --global user.name "YourNameHere"
  - Git config --global user.email "YourEmailHerecert@gmail.com"
- Setup Repository Folder
  - Create a new folder to hold your GitHub repos
  - Open a terminal and navigate to this folder
  - Either clone the repo now `git clone linkToRepoYouWantToCloneHere` or do it later inside VSC
		
## Visual Studio Code
https://code.visualstudio.com/docs/setup/linux
Needed as a text editor, review source, run scripts.
- Download
  - Grab the .deb package https://code.visualstudio.com/download
- Install
  - Open a Root Terminal
  - Navigate to your Downloads
  	- cd /
  	- cd /home/{{userNameHere}}/Downloads
  - Begin typing the command `apt install ./` and then tab until you find your filename
  	- Example: apt install ./code_1.96.0-1733888194_amd64.deb
  - Enter
  - More Commands
  	- apt install apt-transport-https
  	- apt update
  	- apt install code
- Setup
  - Open a regular terminal window
  - Run the command 'code /usr/{{userNameHere}}/code
- Install Extensions
  - GitHub Pull Requests
  - Python
  - Markdown All In One
  - C/C++ Extension Pack
- Account Login
  - Click the Accounts icon in the bottom left
  - Sign in with GitHub
- Clone Repos
  - Click the Source Control icon -> Manage Workspace Trust -> Trust
  - Clone Repository
  	- Clone from GitHub if you already have some, or clone by URL
- Kali Panel Icon
  - In the Kali panel -> Right click -> Panel -> Add new items -> Launcher -> Add
  - This will add the white gear to the top right
  	- Right click the white gear icon -> properties -> Plus Sign to add new item
  	- Search for Code -> Add VSCODE


	
				
				
				
