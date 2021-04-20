import { App, FuzzySuggestModal, TFile, TFolder, normalizePath, Vault, TAbstractFile, Instruction } from "obsidian";
import ExcalidrawPlugin from './main';
import {EMPTY_MESSAGE} from './constants';

export enum openDialogAction {
  openFile,
  insertLink,
}

export class OpenFileDialog extends FuzzySuggestModal<TFile> {
  public app: App;
  private plugin: ExcalidrawPlugin;
  private action: openDialogAction;
  

  constructor(app: App, plugin: ExcalidrawPlugin) {
    super(app);
    this.app = app;
    this.action = openDialogAction.openFile;
    this.plugin = plugin;
    this.setInstructions([{
      command: "Type name of drawing to select.",
      purpose: "",
    }]);

    
    this.inputEl.onkeyup = (e) => {
      if(e.key=="Enter" && this.action == openDialogAction.openFile) {
        if (this.containerEl.innerText.includes(EMPTY_MESSAGE)) {
          this.plugin.createDrawing(this.plugin.settings.folder+'/'+this.inputEl.value+'.excalidraw');
          this.close();
        }
      }
    };
  }

  getItems(): TFile[] {
    let excalidrawFiles: TFile[] = [];
    excalidrawFiles = this.app.vault.getFiles();
    return excalidrawFiles.filter((f:TFile) => (f.extension=='excalidraw'));
  }

  getItemText(item: TFile): string {
    return item.basename;
  }

  onChooseItem(item: TFile, _evt: MouseEvent | KeyboardEvent): void {
    switch(this.action) {
      case(openDialogAction.openFile):
        this.plugin.openDrawing(item);
        break;
      case(openDialogAction.insertLink):
        this.plugin.insertCodeblock(item.path);
        break;
    }
  }

  start(action:openDialogAction): void {
    this.action = action;
    switch(action) {
      case (openDialogAction.openFile):
        this.emptyStateText = EMPTY_MESSAGE;
        this.setPlaceholder("Select existing drawing or type name of new and hit enter.");
        break;
      case (openDialogAction.insertLink):
        this.emptyStateText = "No file matches your query.";
        this.setPlaceholder("Select existing drawing to insert into document.");
        break;
    }
    try {
      let files = this.getItems();
      this.open();
    }
    catch(error) {
      console.log(error);
    }
  }

}