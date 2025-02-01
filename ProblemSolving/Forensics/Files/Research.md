# Identify the File
- `file filenamehere` to get the details
  - C program - Ghidra
  - C# program - /usr/share/applications/AvaloniaILSpy/artifacts/ILSpy
  - .NET program 
  - Android APK - Jadx

# Metadata
- exiftool is better than CyberChef
- Full name of who created the file and their email

# Oletools Scan
https://github.com/decalage2/oletools?tab=readme-ov-file#readme
- Mostly used with Word, Excel, Powerpoint
- `oletools.py fileNameHere`
  - oleid: to analyze OLE files to detect specific characteristics usually found in malicious files.
  - olevba: to extract and analyze VBA Macro source code from MS Office documents (OLE and OpenXML).
  - MacroRaptor: to detect malicious VBA Macros msodde: to detect and extract DDE/DDEAUTO links from MS Office documents, RTF and CSV
  - pyxswf: to detect, extract and analyze Flash objects (SWF) that may be embedded in files such as MS Office documents (e.g. Word, Excel) and RTF, which is especially useful for malware analysis.
  - oleobj: to extract embedded objects from OLE files.
  - rtfobj: to extract embedded objects from RTF files.