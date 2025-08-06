import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Shirt, Plus, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

interface UserProfile {
  skinTone: string
  height: string
  weight: string
  stylePreference: string
  favoriteColors: string
}

interface WardrobeItem {
  _id: string
  userId: string
  imageUrl: string
  category: string
  subcategory?: string
  color?: string
  fit?: string
  brand?: string
  size?: string
  createdAt: string
}

interface WardrobeStats {
  total: number
  byCategory: Record<string, number>
}

const Index = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [wardrobeStats, setWardrobeStats] = useState<WardrobeStats>({ total: 0, byCategory: {} })
  const [loading, setLoading] = useState(true)

  const userId = 'user123' // You can make this dynamic later

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load profile
      const profileResponse = await fetch(`http://localhost:5000/api/profile/${userId}`)
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData)
      }

      // Load wardrobe stats
      const wardrobeResponse = await fetch(`http://localhost:5000/api/wardrobe/${userId}`)
      if (wardrobeResponse.ok) {
        const wardrobeData = await wardrobeResponse.json()
        const stats = {
          total: wardrobeData.length,
          byCategory: wardrobeData.reduce((acc: Record<string, number>, item: WardrobeItem) => {
            acc[item.category] = (acc[item.category] || 0) + 1
            return acc
          }, {})
        }
        setWardrobeStats(stats)
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shirts':
      case 'tops':
        return '👕'
      case 'pants':
      case 'trousers':
        return '👖'
      case 'dresses':
        return '👗'
      case 'shoes':
      case 'footwear':
        return '👟'
      case 'accessories':
        return '👜'
      default:
        return '👕'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <main className="pt-24 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to Your Smart Wardrobe</h1>
            <p className="text-xl text-muted-foreground">
              Your personal AI-powered styling assistant
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link to="/wardrobe">
              <Card className="shadow-elegant hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Shirt className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">View Wardrobe</h3>
                      <p className="text-sm text-muted-foreground">See all your items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/upload">
              <Card className="shadow-elegant hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Add Item</h3>
                      <p className="text-sm text-muted-foreground">Upload new clothing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/chat">
              <Card className="shadow-elegant hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Get Advice</h3>
                      <p className="text-sm text-muted-foreground">Chat with AI stylist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Summary */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Style Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skin Tone</p>
                        <p className="capitalize">{profile.skinTone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Height</p>
                        <p>{profile.height} cm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Weight</p>
                        <p>{profile.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Style</p>
                        <p className="capitalize">{profile.stylePreference}</p>
                      </div>
                    </div>
                    
                    {profile.favoriteColors && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Favorite Colors</p>
                        <p>{profile.favoriteColors}</p>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <Link to="/profile">
                      <Button variant="outline" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Profile Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your style profile to get personalized recommendations
                    </p>
                    <Link to="/profile">
                      <Button>
                        <User className="w-4 h-4 mr-2" />
                        Create Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wardrobe Summary */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="w-5 h-5" />
                  Wardrobe Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wardrobeStats.total > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-primary">{wardrobeStats.total}</div>
                      <p className="text-muted-foreground">Total Items</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">By Category</h4>
                      {Object.entries(wardrobeStats.byCategory).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getCategoryIcon(category)}</span>
                            <span className="capitalize">{category}</span>
                          </div>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <Link to="/wardrobe">
                      <Button variant="outline" className="w-full">
                        <Shirt className="w-4 h-4 mr-2" />
                        View All Items
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shirt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Empty Wardrobe</h3>
                    <p className="text-muted-foreground mb-4">
                      Start building your digital wardrobe by uploading your first item
                    </p>
                    <Link to="/upload">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Item
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index
