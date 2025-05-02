import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';

export function LocationFilter({ setTools,setLoading }) {
  const [pin, setPin] = useState('');

  const fetchToolsByPincode = async (pincode) => {
    if (!pincode) return;
    setLoading(true)
    console.log('Searching tools for pincode:', pincode);
    try {
      const res = await fetch(`/api/tools/approved?pincode=${pincode}`);
      const data = await res.json();
      if (!res.ok) {
        console.error('API error:', data.message || res.statusText);
        alert(`Error: ${data.message || res.status}`);
        setTools([]);
        return;
      }
      setTools(data.tools || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      alert('Network error while fetching tools');
      setTools([]);
      
    }
    setLoading(false)
  };

  const handleManualSearch = () => {
    if (!pin.trim()) return alert('Please enter a pincode');
    fetchToolsByPincode(pin.trim());
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported!');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const res = await fetch(
          `/api/location-to-pincode?lat=${latitude}&lng=${longitude}`
        );
        const data = await res.json();
        if (data.pincode) {
          setPin(data.pincode);
          fetchToolsByPincode(data.pincode);
        } else {
          alert('Could not determine your pincode');
        }
      },
      (err) => alert('Geolocation failed: ' + err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="flex gap-3 items-center justify-center mb-8 flex-wrap">
      <Input
        type="text"
        placeholder="Enter your Pincode"
        value={pin}
        onChange={e => setPin(e.target.value)}
        className="max-w-xs"
      />
      <Button onClick={handleManualSearch}>Search by Pincode</Button>
      <Button variant="outline" onClick={handleUseMyLocation}>
        <LocateFixed className="mr-2" size={16} /> Use My Location
      </Button>
    </div>
  );
}
