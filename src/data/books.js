import book1 from "../assets/covers/book1.jpg";

const books = [
  {
    id: 1,

    title: "موت ہمیشہ شور مچا کر نہیں آتی",

    writer: "ZA Muzaffar",

    category: "Mystery",

    description:
      "A mysterious Urdu novel full of suspense, emotions and unexpected twists.",

    cover: book1,

    chapters: [
      {
        id: 1,

        title: "Chapter 1",

        content: `یہ پہلا باب ہے۔

کہانی یہاں سے شروع ہوتی ہے۔

ازائیل خاموشی سے کھڑا تھا۔

اس کی نظریں دور افق پر جمی ہوئی تھیں۔`,
      },

      {
        id: 2,

        title: "Chapter 2",

        content: `یہ دوسرا باب ہے۔

کہانی مزید دلچسپ ہو جاتی ہے۔

ہر کردار اپنے راز چھپا رہا ہے۔`,
      },

      {
        id: 3,

        title: "Chapter 3",

        content: `یہ تیسرا باب ہے۔

ایک نیا موڑ کہانی کو بدل دیتا ہے۔

اب اصل سفر شروع ہوتا ہے۔`,
      },
    ],
  },
];

export default books;