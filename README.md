# Git My Files

This package is used to find the full file path and status of any files that will show up in the `git status` command. If a file is moved from one folder to another, it will show one record for the delete and one for the addition.

### Example return value:

The package returns an array with the files found and their git status.

```javascript
[
  { filename: "/folder/path/newfile.js", status: "A" }, // Added
  { filename: "/folder/path/modified-file.js", status: "M" }, // Modified
  { filename: "/folder/path/deleted-file.js", status: "D" } //Deleted
  { filename: "/old/folder/path/moved-file.js", status: "D" } // Moved
  { filename: "/new/folder/path/moved-file.js", status: "A" } // Moved
];
```

## Usage

1. Install the package using npm or yarn:

   ```bash
    npm install @ebsolutions/git-my-files
   ```

   or

   ```bash
    yarn add @ebsolutions/git-my-files
   ```

2. Import the method and call it with the folder path you would like to review or leave empty to inspect all files in project root directory:

   ```javascript
   const gitChangedFiles = require("@ebsolutions/git-my-files");

   /// Check specified folder path
   gitChangedFiles("/folder-path-to-files");

   /// Check project root directory
   gitChangedFiles();
   ```
