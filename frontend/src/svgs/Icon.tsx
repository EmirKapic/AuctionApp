export type IconType =
  | "insta"
  | "facebook"
  | "twitter"
  | "magnify"
  | "hammer"
  | "chevronRight"
  | "plus"
  | "minus"
  | "hamburger"
  | "person"
  | "gift"
  | "euro"
  | "largeCart"
  | "largeHammer"
  | "chevronDown"
  | "calendar";

export interface IconProps {
  name: IconType;
}

export default function Icon(props: IconProps) {
  switch (props.name) {
    case "insta":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      );

    case "facebook":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      );

    case "twitter":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>
      );

    case "magnify":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      );
    case "hammer":
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M509.44 871.936 128.512 871.936c-16.384 0-29.184-13.312-29.184-29.184 0-16.384 13.312-29.184 29.184-29.184l380.928 0c16.384 0 29.184 13.312 29.184 29.184C538.624 858.624 525.824 871.936 509.44 871.936z" />
          <path d="M895.488 770.56c-5.12 0-10.24-1.024-14.848-4.096L265.728 411.648c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l614.912 354.816c13.824 8.192 18.944 26.112 10.752 39.936C915.456 765.44 905.216 770.56 895.488 770.56z" />
          <path d="M495.104 438.272c-5.12 0-10.24-1.024-14.848-4.096L309.76 335.872c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l170.496 98.816c13.824 8.192 18.944 26.112 10.752 39.936C515.072 433.152 505.344 438.272 495.104 438.272z" />
          <path d="M577.024 384c-5.12 0-10.24-1.024-14.848-4.096L315.904 237.568c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l246.784 142.336c13.824 8.192 18.944 26.112 10.752 39.936C596.992 378.88 587.264 384 577.024 384z" />
          <path d="M407.04 590.336c-5.12 0-10.24-1.024-14.848-4.096L221.696 487.936c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l170.496 98.816c13.824 8.192 18.944 26.112 10.752 39.936C427.008 585.216 417.28 590.336 407.04 590.336z" />
          <path d="M401.408 688.64c-5.12 0-10.24-1.024-14.848-4.096l-246.784-142.336c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l246.784 142.336c13.824 8.192 18.944 26.112 10.752 39.936C421.376 683.52 411.648 688.64 401.408 688.64z" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      );
    case "plus":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      );
    case "minus":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      );
    case "hamburger":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      );
    case "person":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      );
    case "gift":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      );
    case "euro":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "largeCart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8367D8"
          className="h-24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      );
    case "largeHammer":
      return (
        <svg
          className="h-24"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#8367D8"
        >
          <path d="M509.44 871.936 128.512 871.936c-16.384 0-29.184-13.312-29.184-29.184 0-16.384 13.312-29.184 29.184-29.184l380.928 0c16.384 0 29.184 13.312 29.184 29.184C538.624 858.624 525.824 871.936 509.44 871.936z" />
          <path d="M895.488 770.56c-5.12 0-10.24-1.024-14.848-4.096L265.728 411.648c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l614.912 354.816c13.824 8.192 18.944 26.112 10.752 39.936C915.456 765.44 905.216 770.56 895.488 770.56z" />
          <path d="M495.104 438.272c-5.12 0-10.24-1.024-14.848-4.096L309.76 335.872c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l170.496 98.816c13.824 8.192 18.944 26.112 10.752 39.936C515.072 433.152 505.344 438.272 495.104 438.272z" />
          <path d="M577.024 384c-5.12 0-10.24-1.024-14.848-4.096L315.904 237.568c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l246.784 142.336c13.824 8.192 18.944 26.112 10.752 39.936C596.992 378.88 587.264 384 577.024 384z" />
          <path d="M407.04 590.336c-5.12 0-10.24-1.024-14.848-4.096L221.696 487.936c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l170.496 98.816c13.824 8.192 18.944 26.112 10.752 39.936C427.008 585.216 417.28 590.336 407.04 590.336z" />
          <path d="M401.408 688.64c-5.12 0-10.24-1.024-14.848-4.096l-246.784-142.336c-13.824-8.192-18.944-26.112-10.752-39.936 8.192-13.824 26.112-18.944 39.936-10.752l246.784 142.336c13.824 8.192 18.944 26.112 10.752 39.936C421.376 683.52 411.648 688.64 401.408 688.64z" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      );
  }
}
