# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f32c61ae-a997-4488-8d2c-006900a56924

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f32c61ae-a997-4488-8d2c-006900a56924) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js (Backend)
- MongoDB (Database)
- Cloudinary (Image Storage)
- JWT Authentication

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f32c61ae-a997-4488-8d2c-006900a56924) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend Setup

### Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account
- Cloudinary account for image storage

### Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in your MongoDB connection string
3. Add your Cloudinary credentials
4. Set a secure JWT secret

### Running the Application
```sh
# Install dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..

# Run both frontend and backend
npm run dev:full

# Or run separately:
npm run dev          # Frontend only
npm run dev:server   # Backend only
```

### Coach Dashboard Access
- URL: `/coach`
- Username: `omar_coach_2024`
- Password: `SecureCoachPass!2024`

### Features
- **Subscription Management**: Review and approve/reject subscription requests
- **Payment Proof Storage**: Secure image storage via Cloudinary
- **Resource Assignment**: Assign YouTube videos and Google Drive documents to users
- **Access Control**: Set custom access duration for each user
- **Daily Usage Limits**: Automatic enforcement of daily resource access limits
- **Mobile Responsive**: Fully optimized for mobile devices