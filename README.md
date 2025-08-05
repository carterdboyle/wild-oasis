# Wild Oasis Internal Application

Application used for a cabin rental organization to book guests into cabins and view insights about customer behaviour. 

Built with Vite and manages remote states with Tanstack Query. If you want to run a local server you will need environment variables set up as I have in my source code.

I used the supabase API for the back-end. Create the desired RLS policies in supabase and create authenticated users. Note the files in the `components` folder to see how the data is structured. Supabase buckets were used to store the images and user avatars if they were modified. The initial data is retrieved from the static server instance. 

![image](https://github.com/user-attachments/assets/03764d3d-d31e-4ee3-a413-5be9eac6fb3f)

# Installation

Clone the repo and run `npm install` to install dependencies. Afterwards, run `npm run dev` to run the server instance. 

# Usage

If using the deployment at vercel, https://wild-oh-asis.vercel.app, the login information is username: `admin@wild-oasis.com` password: `pass1234`. 
This application is the companion application to [The Wild Oasis Website](https://the-wild-oh-asis-website.vercel.app/) Next.js SSR website where guests make the bookings. This SPA app is for the workers at the cabin to manage the bookings. 

The Sidebar on the left has a button to refresh the data so you can see what it looks like when it's up to date.

# Features

- Edit and add cabins, with a duplication feature
- Pagination, sorting and filtering on all data tables
- Check in/out guests
- View a dashboard with sales information and upcoming bookings
- Update user data/password and avatar image
- Dark mode
