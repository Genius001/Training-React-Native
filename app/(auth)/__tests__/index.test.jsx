import { render } from "@testing-library/react-native";
import Login from "../Login";

describe('<Login />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Login />);
    getByText('Welcome Back!');
  });
})


