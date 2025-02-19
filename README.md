# Next.js Template README

This template provides a structured starting point for your Next.js project.

## Folder Structure

- **pages**: Contains Next.js pages and API routes.
  - **api**: API endpoints.
- **public**: Publicly accessible files.
  - **img**: Image assets.
    - **icons**: Store all svg icons of your project here.
  - **fonts**: Font files.
  - **videos**: Video files.
- **src**: Source code.
  - **components**: Reusable React components.
  - **sections**: Specific sections or parts of your pages.
  - **styles**: Stylesheets and styling-related files.
  - **data**: Data files or mocks.
  - **utils**: Utility functions and helper modules.
- **scripts**: Custom scripts for project setup or automation.
  - **createPage.js**: Script to create new pages.
  - **createComponent.js**: Script to generate new components.
  - **createSection.js**: Script to scaffold new sections.
- **.env.example**: Example environment variables file.
- **package.json**: Node.js dependencies and project configuration.
- **next.config.json**: Next.js configuration.

## Getting Started

1. Clone this repository.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

## Custom Scripts

Custom scripts in the `scripts` folder can be used to streamline certain tasks.

1. **To create Components** - `npm run create-component ComponentName`  
   The Component name should be in PascalCase for eg:  
   `npm run create-component Button` or  
   `npm run create-component InnerPageBanner`

2. **To create Sections** - `npm run create-section SectionName`  
   The Section name should be in PascalCase and should have Pagename as prefix for eg:  
   `npm run create-section HomeHero` or  
   `npm run create-section WhoWeAreMissionVision`

3. **To create Pages** - `npm run create-page page-name`  
   The Page name should be in Lowercase and can have Hyphens(-) but no Underscores(\_) for eg:  
   `npm run create-page about` or  
   `npm run create-page who-we-are`

## Predefined Components

1. **Button.js** - Buttons used in the project

2. **ContentFromCms.js** - Use this components to render RichText / HTML coming from backend or any API or if you want to pass static HTML. For example:  
   `<ContentFromCms>{data.desc}</ContentFromCms>`  
   `<ContentFromCms>{"<p>Hello</p><p>Brother</p>"}</ContentFromCms>`

3. **Footer.js** - Footer of the project

4. **Header.js** - Header of the project

5. **Metatags.js** - Component to create metatags for each page. For example:  
   `<MetaTags Title={"Home"} Desc={"Home Desc"} OgImg={""} Url={"/"} />`  
   `<MetaTags Title={"About"} Desc={"About Desc"} OgImg={""} Url={"/about"} />`

   If you want to put common metatags for all the pages then dont pass any values to the props except the Url  
   `<MetaTags Title={""} Desc={""} OgImg={""} Url={"/contact"} />`

   You can edit the common metatags in Metatags.js file

6. **SliderArrow.js** - Custom Slider Arrows for any Slick Slider [Documentation](https://crimson-boater-1bc.notion.site/Custom-Arrows-and-Progress-bar-4b648fa4ecfa4bc2a2480a74f1ecbedb?pvs=4)

7. **SliderProgressAndArrow.js** - Custom Slider Arrows with Progress bar for any Slick Slider

## Utils

Utils are just small helper functions that you might require in lot of places and you dont want to write it everywhere. Some of these functions are

1. **EqualHeight.js** - If you want to make height of 2 or more elements equal you can use this function. You can pass class of the element as an argument. For example:  
   `EqualHeight("list_item")` - Here list_item is the class name of the element

2. **RequestHeaders.js** - The `RequestHeaders.js` file, serves as a centralized location for defining request headers used in server-side and client-side API calls within the project.

   **For Server-side api call**  
   `const res = await fetch(API_URL, ServerHeaders); const data = await res.json();`

   **For Client-side api call**  
   `const res = await fetch(API_URL, ClientHeaders); const data = await res.json();`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your environment-specific variables.

## Additional Information

Feel free to modify and expand upon this template to suit your project's needs.

```

```
