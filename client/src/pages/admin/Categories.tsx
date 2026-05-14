import Unauthorized from "@/components/shared/Unauthorized";
import { useCategory } from "@/hooks/category/useCategory";
import Button from "@/components/shared/Button";
import {
  Calendar,
  Edit,
  Edit2,
  List,
  Menu,
  Plus,
  Search,
  Shield,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { confirmToast } from "@/lib/confirmToast";
import CategoryModal from "@/components/features/category/CategoryModal";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import { CategoryType } from "@/types/categoryIcon.type";
import CategoryCard from "@/components/features/category/CategoryCard";

export default function Categories() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { categories, loading, deleteCategory, unauthorized, fetchCategories } =
    useCategory();

  const handleDeleteCategory = (category: any) => {
    console.log(categories);
    confirmToast("Delete this category?", async () => {
      await deleteCategory(category._id);
    });
  };

  const handleEditCategory = (category: CategoryType) => {
    setSelectedcategory(category);
    setOpenModal(true);
  };

  if (loading) {
    return <TransparentSpinner />;
  }

  return (
    <>
      {unauthorized ? (
        <>
          <div className="ml-64 sm:m-auto">
            <Unauthorized message="Admin access only!" />
          </div>
        </>
      ) : (
        <main
          className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
          <CategoryModal
            open={openModal}
            category={selectedcategory}
            onClose={() => {
              setOpenModal(false);
              setSelectedcategory(null);
            }}
            onSuccess={() => {
              fetchCategories();
              setOpenModal(false);
              setSelectedcategory(null);
            }}
          />

          {/* <!-- Table Controls Section --> */}

          <header className="w-full border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-1 py-2">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Category Overview
              </h2>
            </div>
            <Button onClick={() => setOpenModal(true)} variant="primary">
              {" "}
              <Plus className="sm:hidden" />
              <span className="hidden sm:inline">Add Category</span>
            </Button>
          </header>

          <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md-w-50">
            {/* FILTERS */}
            <div className="inline-flex flex-wrap p-1 bg-white  border border-slate-200  rounded-xl">
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100  text-indigo-600 ">
                All <span className="hidden md:inline">categorys</span>
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Manager
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Scanner
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Staff
              </button>
            </div>

            {/* SEARCH + ACTION */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-200  rounded-lg 
        bg-white  text-sm text-slate-900 
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        transition-all"
                  placeholder="Search categorys..."
                  type="text"
                />
              </div>

              <button
                className="p-2 border border-slate-200  rounded-lg 
      bg-white  text-slate-600 hover:bg-slate-50 
       transition-colors"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </section>

          {categories.length === 0 ? (
            <div className="bg-white w-full rounded-3xl p-12 border border-dashed border-slate-200 text-center">
              <Shield className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No categorys found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  onEdit={() => {
                    handleEditCategory(category);
                  }}
                  onDelete={() => {
                    handleDeleteCategory(category);
                  }}
                />
              ))}
            </div>
          )}
        </main>
      )}
    </>
  );
}
