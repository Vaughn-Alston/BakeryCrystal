# Bakery Management Website

A bakery website built as a reusable small-business management template.

The goal of this project is to give business owners a simple way to manage their website content without needing a developer to manually update product information in the code every time something changes.

Instead of relying heavily on ongoing developer-managed updates or third-party site-management platforms, the owner can sign in and manage content directly from the site.

## Current Features

- Customer-facing bakery catalog
- Owner **Sign On** flow
- Admin / Editing Mode
- Editable product controls
- Visual indicator when Editing Mode is active
- Sign out back to normal customer view

## Admin Editing Mode

The site owner can select **Sign On** and authenticate to enter Editing Mode.

Once signed in, the owner can manage editable content directly from the dashboard without modifying the source code.

Editing controls are hidden from normal visitors and are removed again when the owner signs out.

## Project Goal

This project is being developed as a reusable template for small business owners who want more control over their website content and day-to-day updates.

The long-term goal is to support features such as:

- Product management
- Persistent customer carts
- Customer accounts
- Loyalty points
- Owner/admin permissions
- Order management
- Backend database storage
- AWS-hosted services

The backend is planned to use AWS services and PostgreSQL so product, customer, cart, and order data can be stored persistently outside of the frontend code.

## Tech Stack

- Vite
- React
- TypeScript
- JavaScript
- HTML
- CSS
- Node.js / npm
- PostgreSQL — planned backend database
- AWS — planned backend and database infrastructure

## Running This Branch Locally

Make sure Node.js and npm are installed.

Clone the repository:

```bash
git clone <repository-url>

then you want to enter the project folder
cd <project-folder>

download the packages from the project.json file
npm install

finally 
npm run dev

vite will give you a link to click on 

http://localhost:5173/

