import { foo } from "@/lib/services/fooService";

export default async function Home() {
  // Gọi hàm foo() — hàm này lấy dữ liệu từ MongoDB
  const user = await foo();

  return (
      <main style={{ padding: 20 }}>
        <h1>Dữ liệu trả về từ foo()</h1>

        {user ? (
            <div>
              <p><strong>ID:</strong> {user._id.toString()}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <h2>JSON trả về:</h2>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        ) : (
            <p>Không có dữ liệu</p>
        )}
      </main>
  );
}