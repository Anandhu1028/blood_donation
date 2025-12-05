import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Filter, Phone, Mail, Navigation, Droplet, Calendar, Shield, X, ChevronDown } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BloodGroupBadge } from '../components/ui/BloodGroupBadge';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { useDonor } from '../contexts/DonorContext';
import { bloodGroups } from '../lib/data';
import {
  calculateDistance,
  isDonorEligible,
  daysUntilEligible,
  formatPhoneNumber,
  formatDate
} from '../lib/utils';

export function SearchPage() {
  const { donors } = useDonor();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
    maxDistance: 50,
    availableOnly: false,
    searchQuery: ''
  });
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate loading on mount and filter change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filters.bloodGroup, filters.city, filters.availableOnly, filters.searchQuery]);

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // Simulate network delay for location
          setTimeout(() => setLoading(false), 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Default: Delhi
          setLoading(false);
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
      setLoading(false);
    }
  };

  // Filter and sort donors
  const filteredDonors = useMemo(() => {
    let result = Array.isArray(donors) ? [...donors] : [];

    // Global Search Query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.city.toLowerCase().includes(query) ||
        d.bloodGroup.toLowerCase().includes(query)
      );
    }

    if (filters.bloodGroup) {
      result = result.filter(d => d.bloodGroup === filters.bloodGroup);
    }

    if (filters.city) {
      result = result.filter(d => (d.city || '').toLowerCase().includes(filters.city.toLowerCase()));
    }

    if (filters.availableOnly) {
      result = result.filter(d => d.isAvailable && isDonorEligible(d.lastDonationDate));
    }

    if (userLocation) {
      result = result
        .map(d => {
          const coords = d.coordinates || { lat: d.lat || 0, lng: d.lng || 0 };
          return {
            ...d,
            distance: calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng),
          };
        })
        .filter(d => d.distance <= filters.maxDistance)
        .sort((a, b) => a.distance - b.distance);
    }

    return result;
  }, [donors, filters, userLocation]);

  const cities = useMemo(() => {
    return [...new Set((donors || []).map(d => d.city || ''))].filter(Boolean).sort();
  }, [donors]);

  return (
    <div className="min-h-screen bg-page text-page leading-relaxed">

      {/* HERO SECTION */}
      <div className="relative bg-hero-gradient pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container-custom relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              Find a <span className="gradient-text">Life Saver</span>
            </h1>
            <p className="text-xl text-page-subtle max-w-2xl mx-auto mb-10">
              Connect instantly with verified blood donors in your area. Every search is a step towards saving a life.
            </p>
          </motion.div>

          {/* FLOATING SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-purple-500 to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-card border border-page-border rounded-2xl shadow-2xl p-2">
                <Search className="w-6 h-6 text-page-subtle ml-4" />
                <input
                  type="text"
                  placeholder="Search by city, name, or blood group..."
                  className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 text-page placeholder:text-page-subtle/50"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                />
                <Button
                  size="lg"
                  className="rounded-xl px-8 hidden sm:flex"
                  onClick={() => { }}
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* QUICK FILTERS BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {/* Blood Group Dropdown */}
            <div className="relative group">
              <select
                value={filters.bloodGroup}
                onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-page-border text-page text-sm font-medium hover:border-accent/50 focus:ring-accent focus:border-accent transition-all cursor-pointer"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-page-subtle pointer-events-none" />
            </div>

            {/* City Dropdown */}
            <div className="relative group">
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-page-border text-page text-sm font-medium hover:border-accent/50 focus:ring-accent focus:border-accent transition-all cursor-pointer"
              >
                <option value="">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-page-subtle pointer-events-none" />
            </div>

            {/* Availability Toggle */}
            <button
              onClick={() => setFilters({ ...filters, availableOnly: !filters.availableOnly })}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
                ${filters.availableOnly
                  ? 'bg-green-500/10 border-green-500/50 text-green-500'
                  : 'bg-card border-page-border text-page-subtle hover:border-accent/50 hover:text-page'}
              `}
            >
              <div className={`w-2 h-2 rounded-full ${filters.availableOnly ? 'bg-green-500' : 'bg-page-subtle'}`} />
              Available Only
            </button>

            {/* Location Button */}
            <button
              onClick={getUserLocation}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-page-border text-page-subtle text-sm font-medium hover:border-accent/50 hover:text-accent transition-all"
            >
              <Navigation className="w-4 h-4" />
              {userLocation ? 'Near Me' : 'Use Location'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* RESULTS SECTION */}
      <div className="container-custom px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="w-1 h-8 bg-accent rounded-full" />
            Search Results
            <span className="text-sm font-normal text-page-subtle ml-2 bg-page-border/50 px-3 py-1 rounded-full">
              {loading ? '...' : filteredDonors.length} found
            </span>
          </h2>
        </div>

        {loading ? (
          /* SKELETON LOADING LIST */
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-page-border rounded-2xl p-4 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="hidden md:block w-32">
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24 rounded-xl" />
                  <Skeleton className="h-9 w-24 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDonors.length === 0 ? (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card/30 border border-page-border/50 rounded-3xl"
          >
            <div className="w-24 h-24 bg-page-border/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-page-subtle" />
            </div>
            <h3 className="text-2xl font-bold text-page mb-2">No donors found</h3>
            <p className="text-page-subtle max-w-md mx-auto">
              We couldn't find any donors matching your criteria. Try adjusting your filters or search for a wider area.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setFilters({ bloodGroup: '', city: '', maxDistance: 50, availableOnly: false, searchQuery: '' })}
            >
              Clear All Filters
            </Button>
          </motion.div>
        ) : (
          /* DONOR LIST */
          <div className="space-y-4">
            <AnimatePresence>
              {filteredDonors.map((donor, index) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="group relative bg-card hover:bg-card/80 border border-page-border hover:border-accent/30 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col md:flex-row items-center gap-4 md:gap-6">

                    {/* Avatar & Badge */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="relative flex-shrink-0">
                        <BloodGroupBadge bloodGroup={donor.bloodGroup} size="lg" className="w-14 h-14 text-xl shadow-md ring-2 ring-page" />
                        {isDonorEligible(donor.lastDonationDate) && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
                        )}
                      </div>
                      <div className="md:hidden flex-1">
                        <h3 className="text-lg font-bold text-page truncate">{donor.name}</h3>
                        <div className="text-sm text-page-subtle">{donor.city}</div>
                      </div>
                      <div className="md:hidden">
                        {isDonorEligible(donor.lastDonationDate) ? (
                          <Badge variant="success" className="text-xs px-2 py-0.5">Available</Badge>
                        ) : (
                          <Badge variant="warning" className="text-xs px-2 py-0.5">Busy</Badge>
                        )}
                      </div>
                    </div>

                    {/* Desktop Info */}
                    <div className="hidden md:block flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-page truncate group-hover:text-accent transition-colors">{donor.name}</h3>
                        {isDonorEligible(donor.lastDonationDate) ? (
                          <Badge variant="success" className="text-xs px-2 py-0.5 shadow-none">Available</Badge>
                        ) : (
                          <Badge variant="warning" className="text-xs px-2 py-0.5 shadow-none">
                            In {daysUntilEligible(donor.lastDonationDate)} days
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-page-subtle">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {donor.city}
                        </span>
                        <span className="w-1 h-1 bg-page-border rounded-full" />
                        <span>{donor.age} yrs</span>
                        <span className="w-1 h-1 bg-page-border rounded-full" />
                        <span>{donor.gender}</span>
                        {donor.distance != null && (
                          <>
                            <span className="w-1 h-1 bg-page-border rounded-full" />
                            <span className="text-accent font-medium">{donor.distance.toFixed(1)} km</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stats (Desktop) */}
                    <div className="hidden lg:flex items-center gap-8 px-4 border-l border-r border-page-border/50 h-10">
                      <div className="text-center">
                        <div className="text-xs text-page-subtle uppercase tracking-wider">Donations</div>
                        <div className="font-bold text-page">{donor.donationCount}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-page-subtle uppercase tracking-wider">Last</div>
                        <div className="font-bold text-page">{formatDate(donor.lastDonationDate).split(',')[0]}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                      <a href={`tel:${donor.phone}`} className="flex-1 md:flex-none">
                        <Button size="sm" className="w-full md:w-auto bg-page text-page border border-page-border hover:border-accent hover:text-accent shadow-sm whitespace-nowrap">
                          <Phone className="w-3.5 h-3.5 mr-2" />
                          Call
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 md:flex-none w-full md:w-auto border-page-border hover:bg-accent hover:text-white hover:border-accent transition-colors whitespace-nowrap"
                        onClick={() => setSelectedDonor(donor)}
                      >
                        Profile
                      </Button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* DONOR PROFILE MODAL */}
      <Modal
        isOpen={!!selectedDonor}
        onClose={() => setSelectedDonor(null)}
        title="Donor Profile"
        size="lg"
        className="modal-premium"
      >
        {selectedDonor && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-6 pb-6 border-b border-page-border">
              <BloodGroupBadge bloodGroup={selectedDonor.bloodGroup} size="xl" className="w-24 h-24 text-4xl shadow-2xl" />
              <div>
                <h3 className="text-3xl font-bold text-page mb-2">{selectedDonor.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-page-border/30 text-page-subtle font-medium">
                    {selectedDonor.age} Years Old
                  </span>
                  <span className="px-3 py-1 rounded-full bg-page-border/30 text-page-subtle font-medium">
                    {selectedDonor.gender}
                  </span>
                  {isDonorEligible(selectedDonor.lastDonationDate) ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-bold border border-green-500/20">
                      Available to Donate
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-bold border border-orange-500/20">
                      Returns in {daysUntilEligible(selectedDonor.lastDonationDate)} days
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-page/50 border border-page-border text-center">
                <div className="text-2xl font-black text-accent mb-1">{selectedDonor.donationCount}</div>
                <div className="text-xs text-page-subtle uppercase tracking-wider">Donations</div>
              </div>
              <div className="p-4 rounded-2xl bg-page/50 border border-page-border text-center">
                <div className="text-2xl font-black text-page mb-1">12</div>
                <div className="text-xs text-page-subtle uppercase tracking-wider">Lives Saved</div>
              </div>
              <div className="p-4 rounded-2xl bg-page/50 border border-page-border text-center">
                <div className="text-2xl font-black text-page mb-1">100%</div>
                <div className="text-xs text-page-subtle uppercase tracking-wider">Response</div>
              </div>
              <div className="p-4 rounded-2xl bg-page/50 border border-page-border text-center">
                <div className="text-2xl font-black text-page mb-1">4.9</div>
                <div className="text-xs text-page-subtle uppercase tracking-wider">Rating</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-page-subtle uppercase tracking-wider border-b border-page-border pb-2">Contact Info</h4>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-page/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-page-subtle">Phone Number</div>
                    <div className="font-medium text-page">{formatPhoneNumber(selectedDonor.phone)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-page/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-page-subtle">Email Address</div>
                    <div className="font-medium text-page">{selectedDonor.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-page/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-page-subtle">Location</div>
                    <div className="font-medium text-page">{selectedDonor.city}, {selectedDonor.state}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-page-subtle uppercase tracking-wider border-b border-page-border pb-2">Donation History</h4>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-page/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-page-subtle">Last Donation</div>
                    <div className="font-medium text-page">{formatDate(selectedDonor.lastDonationDate)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-page/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-page-subtle">Registration Date</div>
                    <div className="font-medium text-page">{formatDate(selectedDonor.registrationDate)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-4 pt-4">
              <a href={`tel:${selectedDonor.phone}`} className="flex-1">
                <Button size="lg" className="w-full shadow-lg shadow-accent/20">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
              <a href={`mailto:${selectedDonor.email}`} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />
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
