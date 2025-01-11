declare module 'react-native-vector-icons/FontAwesome' {
    import { Icon } from 'react-native-vector-icons/Icon';
    export default Icon;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }