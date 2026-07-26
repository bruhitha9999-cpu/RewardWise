<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/add-card"
    element={
      <ProtectedRoute>
        <AddCard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/edit-card/:id"
    element={
      <ProtectedRoute>
        <EditCard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/redeem/:id"
    element={
      <ProtectedRoute>
        <Redeem />
      </ProtectedRoute>
    }
  />

  <Route
    path="/history"
    element={
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    }
  />
</Routes>