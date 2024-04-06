import React from 'react'
import Layout from '../../content/NavbarSidenavLayout';

const drawerWidth = 240;

export default function AdminDashboard() {

  window.localStorage.setItem("User", "Admin");
  return (
    <Layout>
        <h1>Admin</h1>
    </Layout>
  )
}
