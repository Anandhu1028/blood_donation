import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Phone, Mail, Navigation } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { Modal } from '../components/ui/Modal';
import { useDonor } from '../contexts/DonorContext';
import { bloodGroups } from '../lib/data';
import {
  calculateDistance,
  isDonorEligible,
  daysUntilEligible,
  formatPhoneNumber,
  formatDate
} from '../lib/utils';

/**
 * SearchPage (Premium Dark + Gradient)
 * - Uses "card-premium" class for premium card look (gradient stripe + dark theme)
 * - Palette: Deep Black + Blood Red
 * - Keep gradient stripe effect per user's request
 *
 * NOTE: Add the provided CSS (premium-dark.css) to your global stylesheet.
 */

export function SearchPage() {
  const { donors } = useDonor();
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
    maxDistance: 50,
    availableOnly: false,
  });
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default fallback (Delhi)
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  };

  // Filter and sort donors
  const filteredDonors = useMemo(() => {
    let result = Array.isArray(donors) ? [...donors] : [];

    // Filter by blood group
    if (filters.bloodGroup) {
      result = result.filter(d => d.bloodGroup === filters.bloodGroup);
    }

    // Filter by city
    if (filters.city) {
      result = result.filter(d =>
        (d.city || '').toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filter by availability
    if (filters.availableOnly) {
      result = result.filter(d => d.isAvailable && isDonorEligible(d.lastDonationDate));
    }

    // Calculate distance if user location is available (non-blocking)
    if (userLocation) {
      result = result
        .map(d => {
          // defensive coordinate access
          const coords = d.coordinates || { lat: d.lat || 0, lng: d.lng || 0 };
          return {
            ...d,
            distance: calculateDistance(
              userLocation.lat,
              userLocation.lng,
              coords.lat,
              coords.lng
            ),
          };
        })
        .filter(d => d.distance <= filters.maxDistance)
        .sort((a, b) => a.distance - b.distance);
    }

    return result;
  }, [donors, filters, userLocation]);

  const cities = useMemo(() => {
    return [...new Set((donors || []).map(d => d.city || ''))]
      .filter(Boolean)
      .sort();
  }, [donors]);

  return (
    <div className="min-h-screen bg-page text-page leading-relaxed">
      {/* Header */}
      <div className="bg-hero-gradient text-white py-12 border-b border-page-border">
        <div className="container-custom px-4">
          <h1 className="text-4xl font-display font-extrabold tracking-tight mb-3">Find Blood Donors</h1>
          <p className="text-lg text-page-subtle">Search for verified donors near you — fast, secure, and reliable.</p>
        </div>
      </div>

      <div className="container-custom px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-premium sticky top-20">
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5 text-accent" />
                    Filters
                  </h2>

                  {(filters.bloodGroup || filters.city || filters.availableOnly) && (
                    <button
                      onClick={() => setFilters({
                        bloodGroup: '',
                        city: '',
                        maxDistance: 50,
                        availableOnly: false,
                      })}
                      className="text-sm text-accent-muted hover:text-accent transition"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Blood Group Filter */}
                  <Select
                    label="Blood Group"
                    value={filters.bloodGroup}
                    onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                    options={bloodGroups}
                    placeholder="All Blood Groups"
                    className="bg-transparent text-page"
                  />

                  {/* City Filter */}
                  <Select
                    label="City"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    options={cities}
                    placeholder="All Cities"
                    className="bg-transparent text-page"
                  />

                  {/* Distance Filter */}
                  <div>
                    <label className="block text-sm font-medium text-page-subtle mb-2">
                      Max Distance: <span className="font-semibold text-accent">{filters.maxDistance} km</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={filters.maxDistance}
                      onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                      className="w-full accent-accent"
                    />
                  </div>

                  {/* Availability Filter */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="availableOnly"
                      checked={filters.availableOnly}
                      onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
                      className="w-4 h-4 text-accent focus:ring-accent rounded"
                    />
                    <label htmlFor="availableOnly" className="text-sm text-page-subtle font-medium">
                      Available donors only
                    </label>
                  </div>

                  {/* Get Location Button */}
                  <Button
                    onClick={getUserLocation}
                    variant="outline"
                    className="w-full border-page-border hover:border-accent transition"
                  >
                    <Navigation className="w-4 h-4 mr-2 text-accent" />
                    {userLocation ? 'Update Location' : 'Use My Location'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-page-subtle">
                Found <span className="font-bold text-accent">{filteredDonors.length}</span> donors
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn btn-outline"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {filteredDonors.length === 0 ? (
              <Card className="card-premium">
                <CardBody className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto mb-4 text-page-subtle" />
                  <h3 className="text-xl font-semibold mb-2 text-page">No donors found</h3>
                  <p className="text-page-subtle">Try adjusting your filters or expanding distance.</p>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredDonors.map((donor, index) => (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, type: 'spring', stiffness: 120 }}
                  >
                    <Card className="card-premium hover:card-premium-hover">
                      <CardBody>
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          {/* Blood Group Badge */}
                          <div className="flex-shrink-0">
                            <BloodGroupBadge bloodGroup={donor.bloodGroup} size="lg" className="ring ring-accent-200/10" />
                          </div>

                          {/* Donor Info */}
                          <div className="flex-1 w-full">
                            <div className="flex items-start justify-between mb-2 gap-4">
                              <div className="min-w-0">
                                <h3 className="text-xl font-semibold truncate">{donor.name}</h3>
                                <div className="flex flex-wrap gap-2 text-sm text-page-subtle mt-1">
                                  <span>{donor.age} years</span>
                                  <span>•</span>
                                  <span>{donor.gender}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate max-w-[10rem]">{donor.city}</span>
                                  </span>
                                  {donor.distance != null && (
                                    <>
                                      <span>•</span>
                                      <span className="text-accent font-medium">{donor.distance.toFixed(1)} km away</span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="flex-shrink-0 ml-2">
                                {isDonorEligible(donor.lastDonationDate) ? (
                                  <Badge variant="success">Available</Badge>
                                ) : (
                                  <Badge variant="warning">
                                    Eligible in {daysUntilEligible(donor.lastDonationDate)} days
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-2 text-sm text-page-subtle mb-3">
                              <div>
                                <span className="text-page-subtle">Last Donation:</span>{' '}
                                <span className="font-medium text-page">{formatDate(donor.lastDonationDate)}</span>
                              </div>
                              <div>
                                <span className="text-page-subtle">Total Donations:</span>{' '}
                                <span className="font-medium text-page">{donor.donationCount}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <Button
                                size="sm"
                                onClick={() => setSelectedDonor(donor)}
                              >
                                View Profile
                              </Button>

                              <a href={`tel:${donor.phone}`} aria-label={`Call ${donor.name}`}>
  <Button size="sm" variant="success">
    <Phone className="w-4 h-4 mr-2 text-white" />
    Call
  </Button>
</a>


                              <a href={`mailto:${donor.email}`} aria-label={`Email ${donor.name}`}>
                                <Button size="sm" variant="ghost">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Email
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donor Profile Modal */}
      <Modal
        isOpen={!!selectedDonor}
        onClose={() => setSelectedDonor(null)}
        title="Donor Profile"
        size="lg"
        className="modal-premium"
      >
        {selectedDonor && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <BloodGroupBadge bloodGroup={selectedDonor.bloodGroup} size="lg" />
              <div>
                <h3 className="text-2xl font-semibold">{selectedDonor.name}</h3>
                <p className="text-page-subtle">{selectedDonor.age} years • {selectedDonor.gender}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-page-subtle">Blood Group</label>
                <p className="font-medium text-page">{selectedDonor.bloodGroup}</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Availability</label>
                <p>
                  {isDonorEligible(selectedDonor.lastDonationDate) ? (
                    <Badge variant="success">Available Now</Badge>
                  ) : (
                    <Badge variant="warning">
                      Eligible in {daysUntilEligible(selectedDonor.lastDonationDate)} days
                    </Badge>
                  )}
                </p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Phone</label>
                <p className="font-medium text-page">{formatPhoneNumber(selectedDonor.phone)}</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Email</label>
                <p className="font-medium text-page">{selectedDonor.email}</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Location</label>
                <p className="font-medium text-page">{selectedDonor.city}, {selectedDonor.state}</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Total Donations</label>
                <p className="font-medium text-page">{selectedDonor.donationCount} times</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Last Donation</label>
                <p className="font-medium text-page">{formatDate(selectedDonor.lastDonationDate)}</p>
              </div>

              <div>
                <label className="text-sm text-page-subtle">Registered Since</label>
                <p className="font-medium text-page">{formatDate(selectedDonor.registrationDate)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={`tel:${selectedDonor.phone}`} className="flex-1">
                <Button className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Donor
                </Button>
              </a>

              <a href={`mailto:${selectedDonor.email}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SearchPage;
