import React, { useEffect, useState } from 'react'
import { getCategoryList } from '../services/quiz-service';

interface Prop {
    setCategory: (category: string) => void;
    category: string;
}

const QuizCategory = ({ setCategory, category }: Prop) => {
    const [listCategory, setlistCategory] = useState([{
        "category": "A",
        "questions": "questions",
        "name": "All"
    }])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryList();
                setlistCategory(data);

            } catch (error) {
                console.error('Error fetching category list:', error);
            }
        }
        fetchData();
    }, []);

    const select = (e: any) => {
        setCategory(e);
    }

    return (
        <div className='category menu'>
            Category
            <ul className='categorySelect'>
                {listCategory.map((items, index) => {
                    return <li className={`categorylist ${items.category == category && "active"}`} onClick={() => select(items.category)} key={index}>{items.name}</li>
                })}
            </ul>

        </div>
    )
}

export default QuizCategory;