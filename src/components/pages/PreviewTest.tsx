import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PreviewTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-green-600">
              ✅ Preview is Working!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-xl">If you can see this page, your preview is working correctly!</p>
              <p className="text-muted-foreground">This is a test page to verify the routing system.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Routing Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    React Router is properly configured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Components Load
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ShadCN components are rendering
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Styling Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tailwind CSS is properly configured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Dev Server Running
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Vite dev server is active
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="font-semibold mb-2">Available Routes:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/</code> - Home Page</li>
                <li>• <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/preview-test</code> - This Page</li>
                <li>• <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/dashboard</code> - Dashboard</li>
                <li>• <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/dashboard/chat</code> - AI Chat System</li>
                <li>• <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/storefront</code> - Storefront</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
              <Button onClick={() => window.location.href = '/dashboard/chat'} variant="outline">
                Go to AI Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
