import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await coursesAPI.getAllCourses();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>All Courses</h1>
        <p style={{ color: 'var(--gray-600)', marginBottom: '40px' }}>
          Browse our complete collection of English courses
        </p>

        {loading ? (
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading courses...</p>
          </div>
        ) : courses.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {courses.map(course => (
              <div key={course._id} className="card">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{course.title}</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '15px', fontSize: '14px' }}>
                    {course.shortDescription || course.description.substring(0, 100) + '...'}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <span style={{
                      background: 'var(--gray-200)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px'
                    }}>
                      {course.level}
                    </span>
                    <span style={{
                      background: 'var(--gray-200)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px'
                    }}>
                      {course.duration}h
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div>
                      {course.discount > 0 ? (
                        <>
                          <span style={{
                            textDecoration: 'line-through',
                            color: 'var(--gray-400)',
                            marginRight: '10px'
                          }}>
                            ${course.price}
                          </span>
                          <span style={{
                            color: 'var(--bright-red)',
                            fontSize: '24px',
                            fontWeight: 'bold'
                          }}>
                            ${course.discountedPrice}
                          </span>
                          <span style={{
                            background: 'var(--bright-red)',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            marginLeft: '10px'
                          }}>
                            {course.discount}% OFF
                          </span>
                        </>
                      ) : (
                        <span style={{
                          color: 'var(--primary-black)',
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          ${course.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="btn btn-secondary"
                      style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '14px',
                        textDecoration: 'none',
                        textAlign: 'center'
                      }}
                    >
                      View Details
                    </Link>
                    {!isInCart(course._id) && (
                      <button
                        onClick={() => addToCart(course)}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          padding: '10px',
                          fontSize: '14px'
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
