import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      const { data } = await coursesAPI.getCourseBySlug(slug);
      setCourse(data.course);
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="text-center">
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
          <p style={{ marginBottom: '20px' }}>Course not found</p>
          <Link to="/courses" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-black) 0%, var(--accent-red) 100%)',
        color: 'white',
        padding: '60px 20px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>{course.title}</h1>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>{course.description}</p>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              Level: {course.level}
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              Duration: {course.duration} hours
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              {course.studentsEnrolled} students
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '20px' }}>What You'll Learn</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {course.whatYouWillLearn?.map((item, index) => (
                  <li key={index} style={{
                    padding: '10px 0',
                    borderBottom: '1px solid var(--gray-200)'
                  }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '20px' }}>Course Features</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {course.features?.map((feature, index) => (
                  <li key={index} style={{ padding: '8px 0' }}>
                    • {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <img
              src={course.thumbnail}
              alt={course.title}
              style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
            />

            <div style={{ marginBottom: '20px' }}>
              {course.discount > 0 ? (
                <>
                  <span style={{
                    textDecoration: 'line-through',
                    color: 'var(--gray-400)',
                    fontSize: '18px',
                    marginRight: '10px'
                  }}>
                    ${course.price}
                  </span>
                  <span style={{
                    color: 'var(--bright-red)',
                    fontSize: '36px',
                    fontWeight: 'bold'
                  }}>
                    ${course.discountedPrice}
                  </span>
                  <span style={{
                    display: 'block',
                    color: 'var(--bright-red)',
                    fontSize: '14px',
                    marginTop: '5px'
                  }}>
                    Save {course.discount}%
                  </span>
                </>
              ) : (
                <span style={{
                  color: 'var(--primary-black)',
                  fontSize: '36px',
                  fontWeight: 'bold'
                }}>
                  ${course.price}
                </span>
              )}
            </div>

            {!isInCart(course._id) ? (
              <button
                onClick={() => addToCart(course)}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                Add to Cart
              </button>
            ) : (
              <Link
                to="/cart"
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '10px', textDecoration: 'none', display: 'block', textAlign: 'center' }}
              >
                Go to Cart
              </Link>
            )}

            <p style={{ fontSize: '12px', color: 'var(--gray-600)', textAlign: 'center' }}>
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
