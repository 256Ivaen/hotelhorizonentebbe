import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    emailStatus: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchReservations();
    }
  }, []);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await axios.post(
        "https://api.hotelhorizonug.com/admin_login.php",
        loginData
      );

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        setIsAuthenticated(true);
        fetchReservations();
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const params = new URLSearchParams();

      if (filters.dateFrom) params.append("date_from", filters.dateFrom);
      if (filters.dateTo) params.append("date_to", filters.dateTo);
      if (filters.emailStatus) params.append("email_status", filters.emailStatus);

      const response = await axios.get(
        `https://api.hotelhorizonug.com/get_reservations.php?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setReservations(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch reservations");
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  // Apply filters
  const handleApplyFilters = () => {
    fetchReservations();
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ dateFrom: "", dateTo: "", emailStatus: "" });
    setTimeout(() => fetchReservations(), 100);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-xs text-gray-600">
              Sign in to access the reservations dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#b97a38] text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-[#b97a38]/90 transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Reservations Dashboard
              </h1>
              <p className="text-xs text-gray-600">
                Manage and view all hotel reservations
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Email Status
              </label>
              <select
                value={filters.emailStatus}
                onChange={(e) =>
                  setFilters({ ...filters, emailStatus: e.target.value })
                }
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none"
              >
                <option value="">All</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-[#b97a38] text-white py-2.5 px-4 rounded-xl text-xs font-semibold hover:bg-[#b97a38]/90 transition-all duration-300"
              >
                Apply
              </button>
              <button
                onClick={handleResetFilters}
                className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-xs font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#b97a38]"></div>
              <p className="text-xs text-gray-600 mt-4">Loading reservations...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : reservations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-xs text-gray-600">No reservations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Confirmation #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Guest Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Check-in
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Check-out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Guest Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Hotel Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-900 font-medium">
                        {reservation.confirmation_number}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {reservation.first_name} {reservation.last_name}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {reservation.email}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {reservation.room_type}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {new Date(reservation.check_in_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {new Date(reservation.check_out_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 font-semibold">
                        ${parseFloat(reservation.final_price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.guest_email_status === "sent"
                              ? "bg-green-100 text-green-800"
                              : reservation.guest_email_status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {reservation.guest_email_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.hotel_email_status === "sent"
                              ? "bg-green-100 text-green-800"
                              : reservation.hotel_email_status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {reservation.hotel_email_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {reservations.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                Total Reservations
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {reservations.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                Emails Sent Successfully
              </p>
              <p className="text-2xl font-bold text-green-600">
                {
                  reservations.filter(
                    (r) =>
                      r.guest_email_status === "sent" &&
                      r.hotel_email_status === "sent"
                  ).length
                }
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-[#b97a38]">
                $
                {reservations
                  .reduce((sum, r) => sum + parseFloat(r.final_price), 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;