import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import UserDisplay from "./UserDisplay";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setupStore } from "../../store/store";

const handlers = [
  http.get("https://randomuser.me/api/", async () => {
    await delay(150);
    return HttpResponse.json({
      results: [
        {
          name: { first: "John", last: "Smith" },
        },
      ],
    });
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("初始狀態", async () => {
  const store = setupStore();
  render(
    <Provider store={store}>
      <UserDisplay />
    </Provider>
  );
  expect(screen.getByText(/no user/i)).toBeInTheDocument();
  expect(screen.queryByText(/Fetching user.../i)).not.toBeInTheDocument();
});

test("初始狀態", async () => {
  renderWithProviders(<UserDisplay />);
  expect(screen.getByText(/no user/i)).toBeInTheDocument();
  expect(screen.queryByText(/Fetching user.../i)).not.toBeInTheDocument();
});

test("點擊按鈕後顯示 loading", async () => {
  renderWithProviders(<UserDisplay />);
  fireEvent.click(screen.getByRole("button", { name: /Fetch user/i }));
  expect(screen.queryByText(/no user/i)).toBeInTheDocument();
  expect(screen.getByText(/Fetching user.../i)).toBeInTheDocument();
});

test("點擊按鈕獲得 API 回傳結果後，畫面顯示 user 名稱", async () => {
  renderWithProviders(<UserDisplay />);
  fireEvent.click(screen.getByRole("button", { name: /Fetch user/i }));
  expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Fetching user.../i)).not.toBeInTheDocument();
});

test("已獲得 API 回傳的結果，畫面顯示 user 名稱", () => {
  renderWithProviders(<UserDisplay />, {
    preloadedState: {
      user: {
        name: "John Smith",
        status: "complete",
      },
    },
  });
  expect(screen.queryByText(/John Smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Fetching user.../i)).not.toBeInTheDocument();
});
