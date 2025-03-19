export const Footer = () => {
    const footerStyle = {
        fontSize: 16,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    }

    return (
        <div style={footerStyle}>
            <span>© 2025 David de Fitero</span>
        </div>
    )
}