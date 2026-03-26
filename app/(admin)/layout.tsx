import { AdminSidebar, AdminTopBar, AdminBottomNav } from '@/components/layout/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          {children}
        </main>
        <AdminBottomNav />
      </div>
    </div>
  )
}
