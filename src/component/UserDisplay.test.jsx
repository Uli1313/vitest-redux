import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import UserDisplay from "./UserDisplay";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setupStore } from "../store/store";

const handlers = [
  http.get("https://randomuser.me/api/", async () => {
    await delay(150);
    return HttpResponse.json({
      results: [
        {
          gender: "male",
          name: {
            title: "Mr",
            first: "John",
            last: "Smith",
          },
          location: {
            street: {
              number: 3885,
              name: "Prospect Rd",
            },
            city: "Albury",
            state: "Western Australia",
            country: "Australia",
            postcode: 9813,
            coordinates: {
              latitude: "-86.8227",
              longitude: "-55.4877",
            },
            timezone: {
              offset: "-12:00",
              description: "Eniwetok, Kwajalein",
            },
          },
          email: "steven.sanders@example.com",
          login: {
            uuid: "ec06a0fa-c6f1-4a71-8bf3-de8f5c576f4a",
            username: "whiteduck844",
            password: "pink",
            salt: "Xy8fQBfq",
            md5: "732212bb81c142ab77cae47247cff71c",
            sha1: "471ae59d424084506dbd38e969ed8aa6006748eb",
            sha256:
              "acb092b170245abd1ff0430ecd0c0fc84f43890931f9bf1fb22651fe2fa10a0d",
          },
          dob: {
            date: "1996-06-17T23:44:53.503Z",
            age: 28,
          },
          registered: {
            date: "2012-05-08T22:45:07.706Z",
            age: 13,
          },
          phone: "03-7344-9260",
          cell: "0477-287-245",
          id: {
            name: "TFN",
            value: "552614663",
          },
          picture: {
            large: "https://randomuser.me/api/portraits/men/99.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/99.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/99.jpg",
          },
          nat: "AU",
        },
      ],
      info: {
        seed: "c99e2af14e3c9efc",
        results: 1,
        page: 1,
        version: "1.4",
      },
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
