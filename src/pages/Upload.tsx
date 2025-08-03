import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload as UploadIcon, Image, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [itemDetails, setItemDetails] = useState({
    type: "",
    color: "",
    fit: "",
    brand: "",
    size: ""
  })
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive"
      })
      return
    }

    // Here we would normally upload to backend/Supabase
    toast({
      title: "Item added successfully!",
      description: "Your clothing item has been added to your wardrobe",
    })
    
    // Reset form
    setSelectedFile(null)
    setPreview("")
    setItemDetails({
      type: "",
      color: "",
      fit: "",
      brand: "",
      size: ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Add to Wardrobe</h1>
            <p className="text-muted-foreground">
              Upload photos of your clothing items to build your digital wardrobe
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Upload Clothing Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file-upload">Photo</Label>
                <div className="relative">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="w-full h-32 border-dashed border-2 hover:border-primary transition-colors"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-28 max-w-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <UploadIcon className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload image
                        </span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Item Type</Label>
                  <Input
                    id="type"
                    list="clothing-types"
                    placeholder="Type or select clothing type"
                    value={itemDetails.type}
                    onChange={(e) => setItemDetails(prev => ({ ...prev, type: e.target.value }))}
                  />
                  <datalist id="clothing-types">
                    <option value="Shirt" />
                    <option value="T-Shirt" />
                    <option value="Blouse" />
                    <option value="Tank Top" />
                    <option value="Jeans" />
                    <option value="Pants" />
                    <option value="Trousers" />
                    <option value="Chinos" />
                    <option value="Dress" />
                    <option value="Skirt" />
                    <option value="Shorts" />
                    <option value="Blazer" />
                    <option value="Jacket" />
                    <option value="Coat" />
                    <option value="Hoodie" />
                    <option value="Sweater" />
                    <option value="Cardigan" />
                    <option value="Formal Wear" />
                    <option value="Shoes" />
                    <option value="Sneakers" />
                    <option value="Boots" />
                    <option value="Sandals" />
                    <option value="Accessories" />
                    <option value="Belt" />
                    <option value="Scarf" />
                    <option value="Hat" />
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fit">Fit</Label>
                  <Input
                    id="fit"
                    list="fit-types"
                    placeholder="Type or select fit"
                    value={itemDetails.fit}
                    onChange={(e) => setItemDetails(prev => ({ ...prev, fit: e.target.value }))}
                  />
                  <datalist id="fit-types">
                    <option value="Slim" />
                    <option value="Skinny" />
                    <option value="Regular" />
                    <option value="Straight" />
                    <option value="Loose" />
                    <option value="Relaxed" />
                    <option value="Oversized" />
                    <option value="Tailored" />
                    <option value="Athletic" />
                    <option value="Bootcut" />
                    <option value="Wide-leg" />
                    <option value="Cropped" />
                    <option value="High-waisted" />
                    <option value="Low-rise" />
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g. Navy Blue"
                    value={itemDetails.color}
                    onChange={(e) => setItemDetails(prev => ({ ...prev, color: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="e.g. M, L, 32"
                    value={itemDetails.size}
                    onChange={(e) => setItemDetails(prev => ({ ...prev, size: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand (Optional)</Label>
                <Input
                  id="brand"
                  placeholder="e.g. Nike, Zara"
                  value={itemDetails.brand}
                  onChange={(e) => setItemDetails(prev => ({ ...prev, brand: e.target.value }))}
                />
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full"
                variant="gradient"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Wardrobe
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Upload