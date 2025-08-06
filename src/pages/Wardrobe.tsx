import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Shirt, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const Wardrobe = () => {
  const [items, setItems] = useState<WardrobeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const { toast } = useToast()

  const userId = 'user123' // You can make this dynamic later

  const fetchWardrobeItems = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/wardrobe/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch wardrobe items')
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching wardrobe items:', error)
      toast({
        title: "Error",
        description: "Failed to load wardrobe items",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchWardrobeItems()
  }, [fetchWardrobeItems])

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/wardrobe/${itemId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete item')
      }

      setItems(items.filter(item => item._id !== itemId))
      toast({
        title: "Success",
        description: "Item deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting item:', error)
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      })
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subcategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || categoryFilter === "" || item.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

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
      case 'jackets':
      case 'coats':
        return '🧥'
      case 'skirts':
        return '👗'
      default:
        return '👕'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shirts':
      case 'tops':
        return 'bg-blue-100 text-blue-800'
      case 'pants':
      case 'trousers':
        return 'bg-green-100 text-green-800'
      case 'dresses':
        return 'bg-pink-100 text-pink-800'
      case 'shoes':
      case 'footwear':
        return 'bg-orange-100 text-orange-800'
      case 'accessories':
        return 'bg-purple-100 text-purple-800'
      case 'jackets':
      case 'coats':
        return 'bg-gray-100 text-gray-800'
      case 'skirts':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <main className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your wardrobe...</p>
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">My Wardrobe</h1>
            <p className="text-muted-foreground">
              All your uploaded outfits and clothing items
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6 shadow-elegant">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by category, color, brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => window.location.href = '/upload'} className="shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Wardrobe Grid */}
          {filteredItems.length === 0 ? (
            <Card className="shadow-elegant">
              <CardContent className="pt-12 pb-12 text-center">
                <Shirt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {items.length === 0 
                    ? "Your wardrobe is empty. Start by uploading some clothing items!"
                    : "No items match your search criteria."
                  }
                </p>
                {items.length === 0 && (
                  <Button onClick={() => window.location.href = '/upload'}>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Your First Item
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item._id} className="shadow-elegant hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  {/* Image Section */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={`${item.category} item`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryColor(item.category)} border-0`}>
                        <span className="mr-1">{getCategoryIcon(item.category)}</span>
                        {item.category}
                      </Badge>
                    </div>
                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item._id)}
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Title and Subcategory */}
                      <div>
                        <h3 className="font-semibold text-lg capitalize mb-1">{item.category}</h3>
                        {item.subcategory && (
                          <p className="text-sm text-muted-foreground capitalize">{item.subcategory}</p>
                        )}
                      </div>
                      
                      {/* Metadata Grid */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {item.color && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-muted-foreground">Color:</span>
                            <Badge variant="secondary" className="text-xs capitalize">{item.color}</Badge>
                          </div>
                        )}
                        
                        {item.fit && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-muted-foreground">Fit:</span>
                            <Badge variant="outline" className="text-xs capitalize">{item.fit}</Badge>
                          </div>
                        )}
                        
                        {item.brand && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-muted-foreground">Brand:</span>
                            <span className="text-xs">{item.brand}</span>
                          </div>
                        )}
                        
                        {item.size && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-muted-foreground">Size:</span>
                            <span className="text-xs">{item.size}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Date */}
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        Added {formatDate(item.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Wardrobe 