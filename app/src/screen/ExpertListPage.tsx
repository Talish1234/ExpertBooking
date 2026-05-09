import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { API_BASE } from "../config";
import ExpertCard from "../components/experts/ExpertCard";
import ExpertFilters from "../components/experts/ExpertFilters";
import ErrorBox from "../components/common/ErrorBox";
import Pagination from "../components/common/Pagination";
import globalStyles from "../styles/global";

interface Expert {
  _id: string;
  name: string;
  category: string;
  bio: string;
  reviewCount: number;
  experience: number;
  hourlyRate: number;
  [key: string]: any;
}

interface ApiResponse {
  data: Expert[];
  pagination: {
    pages: number;
  };
}

interface ExpertListPageProps {
  onSelect: (expert: Expert) => void;
}

const ExpertListPage: React.FC<ExpertListPageProps> = ({ onSelect }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchExperts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "6",
        });

        if (category !== "All") {
          params.set("category", category);
        }

        if (search.trim()) {
          params.set("search", search.trim());
        }

        const response = await fetch(
          `${API_BASE}/experts?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }

        const data: ApiResponse = await response.json();

        setExperts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();

    return () => {
      controller.abort();
    };
  }, [page, category, search]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading experts...</Text>
        </View>
      );
    }

    if (error) {
      return <ErrorBox message={error} />;
    }

    if (experts.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            No experts found matching your criteria.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={experts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpertCard expert={item} onClick={onSelect} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.pageTitle}>Find Your Expert</Text>

      <Text style={styles.pageSubTitle}>
        Book a session with world-class professionals
      </Text>

      <ExpertFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <View style={styles.content}>{renderContent()}</View>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </View>
  );
};

export default ExpertListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },

  pageSubTitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  content: {
    flex: 1,
  },

  listContainer: {
    paddingBottom: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
});