export enum Tools {
  "edit" = "edit",
  "draw" = "draw",
  "line" = "line",
  "rectangle" = "rectangle",
  "circle" = "circle",
  "furniture" = "furniture",
  "save" = "save",
  "import_file" = "import_file",
  "delete" = "delete",
  "refresh" = "refresh",
}

// In a global declaration file like `global.d.ts`
export interface ExtendWindow extends Window {
  showSaveFilePicker: () => Promise<FileSystemFileHandle>;
  showOpenFilePicker: () => Promise<FileSystemFileHandle[]>;
}
