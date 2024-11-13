interface IPost {
  userId: number;
  id?: number | string;
  title: string;
  body: string;
  user: {
    fullname: string,
    username: string,
  }
}
interface IAddPostForm {
  title: string,
  body: string,
}

interface IUpdatePost {
  id?: number | string
  title: string;
  body: string;
}
