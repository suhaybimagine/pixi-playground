# imagination
Starter Kit for Front-End application include setup for Webpack, React, PaperJS and many more.

Use it to start developing Front-End applications.

### Running Locally (Development Mode)

Run the following commands on terminal:

```sh
git clone https://github.com/suhaybimagine/imagination.git
npm install
npm run dev
```

When you running on development mode, make sure to comment the "link" tag that includes extracted styles. <b>Don't</b> forget to <b>remove that comment</b> when you're up to build the app for production.

```html
        ...
        <link href="css/common.css" rel="stylesheet" />
        <!-- <link href="release/styles.css" rel="stylesheet" /> -->
</head>
...
```

### Production

Use the following command to bundle the application:

```sh
npm run build
```
