import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Profile = () => {
  const [profile, setProfile] = useState({
    // Required fields
    skinTone: "",
    height: "",
    weight: "",
    
    // Optional measurements
    chest: "",
    waist: "",
    shoulders: "",
    
    // Style preferences
    stylePreference: "",
    favoriteColors: ""
  })

  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Validate required fields
    if (!profile.skinTone || !profile.height || !profile.weight) {
      toast({
        title: "Missing required information",
        description: "Please fill in skin tone, height, and weight",
        variant: "destructive"
      })
      return
    }

    // Here we would save to backend/Supabase
    toast({
      title: "Profile saved successfully!",
      description: "Your styling preferences have been updated",
    })
  }

  const isFormValid = profile.skinTone && profile.height && profile.weight

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Style Profile</h1>
            <p className="text-muted-foreground">
              Help us understand your body type and preferences for better styling recommendations
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Required Fields */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Required Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skinTone">Skin Tone *</Label>
                    <Select value={profile.skinTone} onValueChange={(value) => handleInputChange('skinTone', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skin tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="olive">Olive</SelectItem>
                        <SelectItem value="tan">Tan</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="deep">Deep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g. 170"
                      value={profile.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g. 65"
                    value={profile.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </div>

              <Separator />

              {/* Optional Measurements */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Body Measurements (Optional)</h3>
                <p className="text-sm text-muted-foreground">
                  These measurements help provide more accurate fit recommendations
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (cm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="e.g. 95"
                      value={profile.chest}
                      onChange={(e) => handleInputChange('chest', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g. 80"
                      value={profile.waist}
                      onChange={(e) => handleInputChange('waist', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shoulders">Shoulders (cm)</Label>
                    <Input
                      id="shoulders"
                      type="number"
                      placeholder="e.g. 42"
                      value={profile.shoulders}
                      onChange={(e) => handleInputChange('shoulders', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Style Preferences */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Style Preferences</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stylePreference">Preferred Style</Label>
                    <Select value={profile.stylePreference} onValueChange={(value) => handleInputChange('stylePreference', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="business">Business/Professional</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="trendy">Trendy/Fashion-forward</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="bohemian">Bohemian</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteColors">Favorite Colors</Label>
                    <Input
                      id="favoriteColors"
                      placeholder="e.g. Navy blue, white, beige"
                      value={profile.favoriteColors}
                      onChange={(e) => handleInputChange('favoriteColors', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full"
                variant={isFormValid ? "gradient" : "outline"}
                disabled={!isFormValid}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Profile