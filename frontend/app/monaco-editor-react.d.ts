declare module '@monaco-editor/react' {
    import { FC } from 'react';
    
    interface EditorProps {
      language?: string;
      value?: string;
      theme?: string;
      defaultValue?: string;
      onChange?: (value: string | undefined, event: any) => void;
      className?: string;
      [key: string]: any;
    }
  
    const Editor: FC<EditorProps>;
    export default Editor;
  }