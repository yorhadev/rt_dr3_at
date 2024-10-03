import { Button, type ButtonProps } from "react-native-paper";

export default function MyButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
