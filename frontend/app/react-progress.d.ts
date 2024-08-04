declare module 'react-progress' {
    import { FC } from 'react';
  
    interface ProgressProps {
      percent?: number;
      color?: string;
      height?: number | string;
      [key: string]: any;
    }
  
    const Progress: FC<ProgressProps>;
    export default Progress;
  }