
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Subscription from "./pages/Subscription";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import { AdminProvider } from "./contexts/AdminContext";
import { SectionsProvider } from "./contexts/SectionsContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <AdminProvider>
            <SectionsProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SectionsProvider>
          </AdminProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
