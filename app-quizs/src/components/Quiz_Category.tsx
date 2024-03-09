import React, { useEffect, useState } from 'react';
import { getCategoryList } from '../services/quiz-service';

interface QuizCategoryProps {
    setCategory: (category: string) => void;
    category: string;
}

const QuizCategory: React.FC<QuizCategoryProps> = ({ setCategory, category }) => {
    const [listCategory, setListCategory] = useState<{ category: string; name: string }[]>([
        { category: 'A', name: 'All' }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryList();
                setListCategory(data);
            } catch (error) {
                console.error('Error fetching category list:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategorySelect = (selectedCategory: string) => {
        setCategory(selectedCategory);
    };

    return (
        <div className="category menu">
            Category
            <ul className="categorySelect">
                {listCategory.map((categoryItem, index) => (
                    <li
                        key={index}
                        className={`categorylist ${categoryItem.category === category && 'active'}`}
                        onClick={() => handleCategorySelect(categoryItem.category)}
                    >
                        {categoryItem.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizCategory;
