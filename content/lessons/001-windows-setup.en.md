---
id: 1
slug: windows-setup
title: Prepare Windows for development
intro: Learn the PowerShell basics, verify the required conditions, and prepare an organized home for your course projects.
layout: blocks
---

:::explanation title="What you will learn"
By the end of this lesson, you will know how to open PowerShell, run a command, read its result, and verify which folder you are working in.

We will confirm that the computer runs Windows 10 or Windows 11, that PowerShell works, that a secure internet connection is available, and that you can create folders inside your user area.

Git, uv, and Python will be installed in later lessons. This lesson only prepares a clean foundation and confirms that the computer is ready.
:::

:::explanation title="What is PowerShell?"
PowerShell lets you give written instructions to Windows. Such an instruction is called a command.

A command usually contains a name that describes an action and may include additional details that change how the action works. After a command runs, PowerShell displays output or an error and then returns the prompt.

A window in which you type commands is called a terminal. PowerShell is the tool that interprets and performs the commands inside that window.

You do not need to run PowerShell as an administrator. Normal permissions are safer for daily work and are sufficient for this learning path.
:::

:::commandStep title="Confirm your Windows version"
The winver command asks Windows to open an information window showing the system edition, version, and build.

Open Start, type PowerShell, and open a normal PowerShell window, not an administrator session. Then run:

```powershell
winver
```

How do you know it worked? An About Windows window opens and identifies Windows 10 or Windows 11. Close the window after checking.
:::

:::commandStep title="Confirm that PowerShell works"
$PSVersionTable is a built-in variable containing information about the current PowerShell environment. The .PSVersion property selects only the version information.

```powershell
$PSVersionTable.PSVersion
```

How do you know it worked? Version information appears and the prompt returns. The values can differ between computers.
:::

:::explanation title="Meet your user folder"
Every Windows account has a personal folder in which it can store files without administrator permissions.

PowerShell keeps the path to this folder in the built-in $HOME variable. Using the variable makes a command work for every learner without knowing the Windows account name in advance.
:::

:::commandStep title="Display your user folder"
The following command does not change any files. It only asks PowerShell to display the value stored in $HOME.

```powershell
$HOME
```

How do you know it worked? PowerShell prints a path to your user folder, usually in the form C:\Users\username.
:::

:::commandStep title="Create the course workspace"
New-Item creates a new item. -ItemType Directory defines the item as a folder, and -Path selects where it will be created.

The -Force option allows the command to run again if the folder already exists. It does not erase files already stored there.

```powershell
New-Item -ItemType Directory -Path "$HOME\HagPy" -Force
```

How do you know it worked? PowerShell displays an item named HagPy, and the folder exists inside your user folder.
:::

:::explanation title="What is the current directory?"
Every PowerShell window has a current directory. Commands that work with files usually operate relative to this location.

Moving into a folder does not delete or relocate it. It only tells PowerShell, “This is where I want to work now.”
:::

:::commandStep title="Move into the HagPy folder"
Set-Location changes the current directory to the path provided to it.

```powershell
Set-Location "$HOME\HagPy"
```

How do you know it worked? The command finishes without an error and the prompt returns.
:::

:::commandStep title="Verify your current location"
Get-Location displays the current directory. It is a verification command and changes nothing on the computer.

```powershell
Get-Location
```

How do you know it worked? The printed path ends with \HagPy.
:::

:::explanation title="Check the connection required later"
Later lessons will download tools and communicate with internet services. These connections use HTTPS, whose default port is 443.

Test-NetConnection checks whether the computer can create a connection to a specific destination. It installs nothing and does not send passwords or personal information.
:::

:::commandStep title="Check secure internet access"
The following command attempts to connect to GitHub through the HTTPS port.

```powershell
Test-NetConnection github.com -Port 443
```

How do you know it worked? The TcpTestSucceeded line contains True. If it contains False, check the internet connection, VPN, firewall, or organizational network restrictions before continuing.
:::

:::explanation title="Why this preparation matters"
When a command fails, you need to know whether the problem belongs to the tool or to the surrounding environment.

These checks separate the possibilities: we know which operating system is running, that PowerShell accepts commands, that the user folder is writable, and that the computer can reach a service required later.

If an installation fails in the next lesson, this foundation gives us evidence for diagnosis instead of forcing us to guess.
:::

:::warning title="Common mistakes"
PowerShell is running as administrator: Close it and open a normal window. Administrator permissions are not required in this lesson.

A pasted command did not run: Press Enter after pasting it.

The path does not end with HagPy: Run Set-Location "$HOME\HagPy" again, followed by Get-Location.

Typing a path produced an error: A path is not a command. Use Set-Location to move into a folder.

TcpTestSucceeded is False: Do not change security settings at random. First check the internet connection, try without a VPN, or contact the network administrator when using an organization-managed computer.
:::

:::exercise title="Short practice"
Inside the HagPy folder, create a folder named practice, move into it, and verify the location. Before each command, try to state what you expect it to do:

```powershell
New-Item -ItemType Directory -Path practice -Force
Set-Location practice
Get-Location
```

The exercise is complete when the printed path ends with \HagPy\practice.

Then return to the HagPy folder. Two dots, .., represent the parent folder:

```powershell
Set-Location ..
Get-Location
```

You are finished when the path ends with \HagPy again.
:::

:::summary title="Summary"
- PowerShell accepts commands and asks Windows to perform them.
- Normal course work does not require administrator permissions.
- $HOME points to the current user's folder.
- The current directory determines where many commands operate.
- Set-Location changes folders and Get-Location displays the current location.
- Test-NetConnection checks whether a network destination can be reached.
- The computer is ready for the installation lessons when every success check in this lesson passes.
:::

:::terms title="Terms you learned"
- Terminal: A window where commands are entered and their output is displayed.
- PowerShell: A Windows tool that interprets and runs commands.
- Command: A written instruction requesting a defined action.
- Output: Information displayed after a command runs.
- Path: The address of a file or folder.
- Current directory: The folder in which PowerShell is currently working.
- Automatic variable: A variable that PowerShell creates and maintains automatically, such as $HOME.
- HTTPS: An encrypted connection used by websites and internet services.
- Port 443: The default port for HTTPS connections.
:::
